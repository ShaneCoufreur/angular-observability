import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import MapMouseEvent = google.maps.MapMouseEvent;

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnDestroy {
  taskResult?: { [p: string]: string };
  map?: google.maps.Map;
  lat: number | undefined;
  long: number | undefined;

  private subs?: Subscription;

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) {
    this.subs = zone.onStable.subscribe(() => console.log('change'));
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }


  initMap(element: HTMLDivElement): void {
    this.zone.runOutsideAngular(() => {
      this.map = new google.maps.Map(element, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    });

    this.map?.addListener('click', (event: MapMouseEvent) => {
      this.zone.run(() => {
        this.lat = event.latLng?.lat();
        this.long = event.latLng?.lng();
        this.cd.markForCheck();
      });
    });
  }

  performComplexTask(iterations: number): void {
    const useWorker = typeof Worker !== 'undefined';
    if (useWorker) {
      this.getTaskResultFromWorker(iterations)
        .then(result => {
          this.taskResult = result;
          this.cd.markForCheck();
        });
    } else {
      this.taskResult = this.getTaskResultSync(iterations);
    }
  }

  private getTaskResultFromWorker(iterations: number): Promise<{ [id: string]: string }> {
    return new Promise((resolve => {
      // Create a new
      const worker = new Worker(new URL('./parse-numbers.worker', import.meta.url), {type: 'module'});
      worker.onmessage = (resp) => {
        resolve(resp.data);
      };
      worker.postMessage(iterations);
    }));
  }

  private getTaskResultSync(iterations: number): { [id: string]: string } {
    const response: { [id: string]: string } = {
      startMsg: `CPU-Intense tasks can Block UI-Thread, e.g. Data-Parsing ${iterations}`
    };
    response.resultData = `${performComplexTask(iterations)}`;
    return response;
  }
}

function performComplexTask(iterations: number): number {
  if (iterations <= 1) {
    return 1;
  }
  return performComplexTask(iterations - 1) + performComplexTask(iterations - 2);
}

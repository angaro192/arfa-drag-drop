import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export class HelpersService {
    constructor() { }
    compress(file, MAX_WIDTH = 200, MAX_HEIGHT = 200) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return Observable.create((observer) => {
            reader.onload = (ev) => {
                const img = new Image();
                img.src = ev.target.result;
                (img.onload = () => {
                    const elem = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    }
                    else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    elem.width = width;
                    elem.height = height;
                    const ctx = elem.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    ctx.canvas.toBlob((blob) => {
                        observer.next(new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        }));
                    }, file.type, 1);
                }),
                    (reader.onerror = (error) => observer.error(error));
            };
        });
    }
}
HelpersService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: HelpersService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
HelpersService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: HelpersService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: HelpersService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyc1NlcnZpY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FyZmEtZHJhZy1kcm9wL3NyYy9saWIvc2VydmljZXMvaGVscGVyc1NlcnZpY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBS2xDLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLGdCQUFlLENBQUM7SUFFaEIsUUFBUSxDQUNOLElBQVUsRUFDVixZQUFvQixHQUFHLEVBQ3ZCLGFBQXFCLEdBQUc7UUFFeEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUVoQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNCLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRTtnQkFDckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFFeEIsR0FBRyxDQUFDLEdBQUcsR0FBSSxFQUFFLENBQUMsTUFBYyxDQUFDLE1BQU0sQ0FBQztnQkFFcEMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztvQkFDdEIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztvQkFFeEIsSUFBSSxLQUFLLEdBQUcsTUFBTSxFQUFFO3dCQUNsQixJQUFJLEtBQUssR0FBRyxTQUFTLEVBQUU7NEJBQ3JCLE1BQU0sSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDOzRCQUU1QixLQUFLLEdBQUcsU0FBUyxDQUFDO3lCQUNuQjtxQkFDRjt5QkFBTTt3QkFDTCxJQUFJLE1BQU0sR0FBRyxVQUFVLEVBQUU7NEJBQ3ZCLEtBQUssSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDOzRCQUU3QixNQUFNLEdBQUcsVUFBVSxDQUFDO3lCQUNyQjtxQkFDRjtvQkFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQ3JCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUE2QixDQUFDO29CQUM5RCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDeEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ2YsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDUCxRQUFRLENBQUMsSUFBSSxDQUNYLElBQUksSUFBSSxDQUFDLENBQUMsSUFBZ0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7NEJBQ3RDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTs0QkFFZixZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTt5QkFDekIsQ0FBQyxDQUNILENBQUM7b0JBQ0osQ0FBQyxFQUNELElBQUksQ0FBQyxJQUFJLEVBQ1QsQ0FBQyxDQUNGLENBQUM7Z0JBQ0osQ0FBQyxDQUFDO29CQUNBLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7MkdBekRVLGNBQWM7K0dBQWQsY0FBYyxjQUZiLE1BQU07MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBIZWxwZXJzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjb21wcmVzcyhcbiAgICBmaWxlOiBGaWxlLFxuICAgIE1BWF9XSURUSDogbnVtYmVyID0gMjAwLFxuICAgIE1BWF9IRUlHSFQ6IG51bWJlciA9IDIwMFxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcblxuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IChldikgPT4ge1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICBpbWcuc3JjID0gKGV2LnRhcmdldCBhcyBhbnkpLnJlc3VsdDtcblxuICAgICAgICAoaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgbGV0IHdpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICAgIGxldCBoZWlnaHQgPSBpbWcuaGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKHdpZHRoID4gaGVpZ2h0KSB7XG4gICAgICAgICAgICBpZiAod2lkdGggPiBNQVhfV0lEVEgpIHtcbiAgICAgICAgICAgICAgaGVpZ2h0ICo9IE1BWF9XSURUSCAvIHdpZHRoO1xuXG4gICAgICAgICAgICAgIHdpZHRoID0gTUFYX1dJRFRIO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0ID4gTUFYX0hFSUdIVCkge1xuICAgICAgICAgICAgICB3aWR0aCAqPSBNQVhfSEVJR0hUIC8gaGVpZ2h0O1xuXG4gICAgICAgICAgICAgIGhlaWdodCA9IE1BWF9IRUlHSFQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW0ud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICBlbGVtLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICBjb25zdCBjdHggPSBlbGVtLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICBjdHguY2FudmFzLnRvQmxvYihcbiAgICAgICAgICAgIChibG9iKSA9PiB7XG4gICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoXG4gICAgICAgICAgICAgICAgbmV3IEZpbGUoW2Jsb2IgYXMgQmxvYlBhcnRdLCBmaWxlLm5hbWUsIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGZpbGUudHlwZSxcblxuICAgICAgICAgICAgICAgICAgbGFzdE1vZGlmaWVkOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlsZS50eXBlLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICAgIChyZWFkZXIub25lcnJvciA9IChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
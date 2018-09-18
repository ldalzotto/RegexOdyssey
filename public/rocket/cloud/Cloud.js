export class Cloud {
    constructor() {
        const divElement = document.createElement("div");
        divElement.innerHTML = html;
        divElement.style.position = "absolute";
        divElement.style.transform = "rotate(0deg)";
        this.html = divElement;
        this.svgElement = this.html.querySelector("svg");

        this.html.style.transition = "transform 2s linear 0s, top 2s linear 0s, left 2s linear 0s, opacity 2s linear 0s";
    }

    setPosition(bottom, left) {
        this.html.style.top = bottom - (parseInt(this.svgElement.style.height) / 2) + "px";
        this.html.style.left = left - (parseInt(this.svgElement.style.width) / 2) + "px";
    }

    spawn(cloudContainerElement) {

        cloudContainerElement.appendChild(this.html);

        setTimeout(() => {
            this.html.parentNode.removeChild(this.html);
        }, 2000);
        //random orientation
        const randomAngleIndeDeg = Math.floor(Math.random() * 360);
        this.html.style.transform = `rotate(${randomAngleIndeDeg}deg)`;


        setTimeout(() => {
            this.html.style.opacity = 0;
            const randomAngleSpeedIndeDeg = Math.floor(Math.random() * 360);
            this.html.style.transform = `rotate(${randomAngleIndeDeg + randomAngleSpeedIndeDeg}deg)`;
            this.html.style.top = `${parseInt(this.html.style.top) + 80}px`;
            this.html.style.left = `${parseInt(this.html.style.left) - 50}px`;

        }, 100);
    }
}

const html = `
<svg
  style="height: 30px;
    width: 30px;
   xmlns="http://www.w3.org/2000/svg"
   id="svg8"
   version="1.1"
   viewBox="0 0 124.30592 81.75647"
   height="81.75647mm"
   width="124.30592mm">
  <g
     transform="translate(-41.421316,-79.043622)"
     id="layer1">
    <path
       id="path6034"
       d="M 55.766328,107.82358 C 55.504022,95.737451 68.364327,90.386101 72.002949,92.923301 75.251034,75.385883 94.755197,77.060195 100.86806,83.836139 c 5.90051,-3.928584 16.18309,-5.070985 22.78473,2.271792 5.98259,0.41831 10.91797,2.93103 14.63301,7.88445 21.02319,-4.77669 35.71068,17.311759 22.28597,30.936449 1.78538,9.31741 -2.03165,14.16913 -8.9225,16.57071 0.56646,8.43885 -8.48066,18.32357 -23.8538,14.29892 -7.52324,5.49187 -15.60555,6.67896 -24.38835,2.47225 -8.223693,3.08984 -13.938551,0.77604 -18.909318,-3.14042 -14.192859,1.54746 -20.610604,-4.47824 -25.190153,-12.2944 -3.221437,0.0957 -5.759024,-0.57641 -8.045068,-1.92009 -17.12833,-10.0676 -9.46969,-31.33716 4.503747,-33.09222 z"
       style="fill:#8ee4af;fill-opacity:1;stroke:none;stroke-width:0.26458332;stroke-opacity:1" />
    <path
       id="path6036"
       d="m 78.417416,97.533711 c -3.955511,-8.35501 4.269056,-14.01816 10.795222,-14.620783 6.808245,-0.628671 12.027732,4.046509 12.457222,6.869963 3.77914,-5.80571 16.58002,-7.592029 21.5152,0.26727 7.47483,-0.47763 12.41731,3.53486 14.49937,8.8199 9.32455,-3.67481 18.50395,-0.1268 22.64759,5.866539 4.12867,5.9717 3.25039,14.37246 -3.33737,19.72451 5.51813,8.34776 -3.41207,15.14501 -8.55262,13.8312 3.89549,10.9798 -10.55406,20.15272 -19.80898,12.73109 -6.74708,7.42735 -17.44024,7.24468 -23.35505,2.90418 -9.511777,5.05981 -15.654451,-0.39316 -17.506152,-2.93996 -10.76057,3.40537 -22.29312,-4.18055 -24.054257,-11.55941 -27.54411,0.0482 -18.71445,-28.58843 -1.536799,-28.59784 -3.629661,-8.36381 4.932609,-17.895409 16.236624,-13.296659 z"
       style="fill:#05386b;fill-opacity:1;stroke:none;stroke-width:0.26458332;stroke-opacity:1" />
    <path
       id="path6040-6"
       d="m 132.02255,110.52253 c -3.42948,-7.64276 -9.60391,-10.95078 -17.91677,-10.38483 0.78372,-1.218924 6.4513,-5.555446 13.08591,-1.506827 6.01945,3.525487 5.17613,10.816707 4.83086,11.891657 z"
       style="fill:#8ee4af;fill-opacity:1;stroke:none;stroke-width:0.18015727;stroke-opacity:1" />
    <path
       id="path6040-6-7"
       d="m 144.63494,135.75324 c -4.95173,-8.77069 -13.86682,-12.56692 -25.86953,-11.91744 1.13159,-1.39881 9.31486,-6.37532 18.89438,-1.72921 8.69132,4.04578 7.47367,12.41305 6.97515,13.64665 z"
       style="fill:#8ee4af;fill-opacity:1;stroke:none;stroke-width:0.23190391;stroke-opacity:1" />
    <path
       id="path6040-6-7-5"
       d="m 101.07617,122.04923 c -4.548011,-8.92108 -12.736257,-12.78241 -23.760401,-12.12179 1.039338,-1.42279 8.555426,-6.48464 17.35394,-1.75886 7.982721,4.11515 6.864351,12.6259 6.406461,13.88065 z"
       style="fill:#8ee4af;fill-opacity:1;stroke:none;stroke-width:0.22414684;stroke-opacity:1" />
    <path
       id="path6040-6-7-3"
       d="m 93.749729,140.32044 c -4.093841,-8.6203 -11.46439,-12.35143 -21.38764,-11.71309 0.935547,-1.37482 7.701063,-6.266 15.620939,-1.69956 7.185552,3.97641 6.178858,12.2002 5.766701,13.41265 z"
       style="fill:#8ee4af;fill-opacity:1;stroke:none;stroke-width:0.20904489;stroke-opacity:1" />
  </g>
</svg>

`


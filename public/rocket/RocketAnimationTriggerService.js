export class RocketAnimationTriggerService {
    constructor(cloudContainerElement) {
        this.cloudContainerElement = cloudContainerElement;
    }

    triggerAnimation(rocket) {
        rocket.triggerAnimation(this.cloudContainerElement);
    }
}
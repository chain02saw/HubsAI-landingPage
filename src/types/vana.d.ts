// Declaration file for Vanta.js
declare module 'vanta/dist/vanta.net.min' {
    interface VantaEffect {
      destroy(): void;
    }
  
    interface VantaConfig {
      el: HTMLElement | null;
      THREE: any;
      mouseControls?: boolean;
      touchControls?: boolean;
      gyroControls?: boolean;
      minHeight?: number;
      minWidth?: number;
      scale?: number;
      scaleMobile?: number;
      color?: number;
      backgroundColor?: number;
      points?: number;
      maxDistance?: number;
      spacing?: number;
      showDots?: boolean;
    }
  
    const VANTA: (config: VantaConfig) => VantaEffect;
    export default VANTA;
  }
  
  declare module 'vanta/dist/vanta.birds.min' {
    interface VantaEffect {
      destroy(): void;
    }
  
    interface VantaConfig {
      el: HTMLElement | null;
      THREE: any;
      mouseControls?: boolean;
      touchControls?: boolean;
      gyroControls?: boolean;
      minHeight?: number;
      minWidth?: number;
      scale?: number;
      scaleMobile?: number;
      color?: number;
      backgroundColor?: number;
      [key: string]: any;
    }
  
    const VANTA: (config: VantaConfig) => VantaEffect;
    export default VANTA;
  }
  
  declare module 'vanta/dist/vanta.waves.min' {
    interface VantaEffect {
      destroy(): void;
    }
  
    interface VantaConfig {
      el: HTMLElement | null;
      THREE: any;
      mouseControls?: boolean;
      touchControls?: boolean;
      gyroControls?: boolean;
      minHeight?: number;
      minWidth?: number;
      scale?: number;
      scaleMobile?: number;
      color?: number;
      backgroundColor?: number;
      [key: string]: any;
    }
  
    const VANTA: (config: VantaConfig) => VantaEffect;
    export default VANTA;
  }
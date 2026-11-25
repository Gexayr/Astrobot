import React from 'react';
import { motion } from 'framer-motion';
import { 
  Ruler, Weight, Battery, Zap, Volume2, Mic, 
  Wifi, Bluetooth, Cpu, Camera, Hand, Activity, Eye 
} from 'lucide-react';
import productBox from '@/assets/images/product-box.webp';

const specs = [
  { icon: <Ruler size={20}/>, label: "Height", value: "28 cm / 11 in" },
  { icon: <Weight size={20}/>, label: "Weight", value: "1.2 kg / 2.65 lbs" },
  { icon: <Battery size={20}/>, label: "Battery", value: "3000 mAh (up to 4 hours)" },
  { icon: <Zap size={20}/>, label: "Charging", value: "USB-C (2 hours)" },
  { icon: <Volume2 size={20}/>, label: "Speaker", value: "360° omnidirectional" },
  { icon: <Mic size={20}/>, label: "Microphone", value: "Far-field array" },
  { icon: <Wifi size={20}/>, label: "WiFi", value: "2.4 GHz / 5 GHz" },
  { icon: <Bluetooth size={20}/>, label: "Bluetooth", value: "5.0 BLE" },
  { icon: <Activity size={20}/>, label: "Servo Motors", value: "14 precision servos" },
  { icon: <Camera size={20}/>, label: "Camera", value: "5MP wide-angle" },
  { icon: <Hand size={20}/>, label: "Touch Sensors", value: "8 capacitive zones" },
  { icon: <Cpu size={20}/>, label: "Processor", value: "ESP32 dual-core" },
  { icon: <Eye size={20}/>, label: "LED Eyes", value: "Full-color OLED" },
  { icon: <Code2 size={20}/>, label: "Platform", value: "Arduino Compatible" },
];

// Helper icon component since Code2 wasn't imported from lucide-react above
function Code2(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
}


export const SpecsSection = () => {
  return (
    <section id="specifications" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Tech Specs</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Engineered with precision. Every component is designed to deliver a seamless, lifelike experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-4 rounded-xl flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {spec.icon}
                </div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">{spec.label}</div>
                  <div className="font-medium text-white/90 text-sm">{spec.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <img 
              src={productBox} 
              alt="AstroBot retail box"
              loading="lazy" 
              className="w-full max-w-xl mx-auto relative z-10 rounded-2xl drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

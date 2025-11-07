import React, {useState, useEffect, useRef} from "react";
import testimonios from './data';
import Testimonial from "./components/Testimonial";
import Controls from "./components/Controls";
import './style.css';

export default function App() {
    const [index, setIndex] = useState(0);
    const length = testimonios.length;
    const autoplayRef = useRef(null);

    const next = () => setIndex(prev => (prev + 1) % length);
    const prev = () => setIndex(prev => (prev - 1 + length) % length);
    const random = () => {
        let r = Math.floor(Math.random() * length);
        if (r === index) r = (r + 1) % length;
        setIndex(r);
    };

    useEffect(() => {
        autoplayRef.current = setInterval(next, 5000);
        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, []);

    return (
        <div className="app">
            <h1>Testimonios de Clientes</h1>
            <div className="testimonial-container">
                <Testimonial item={testimonios[index]} />
                <Controls onPrev={prev} onNext={next} onRandom={random} />
            </div>
        </div>
    );
}
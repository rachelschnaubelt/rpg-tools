import { useState } from "react";
import './styles.css';

type Props = {
    max: number,
    min: number,
    selectedMax: number,
    selectedMin: number,
    label: string,
    setMax: (value: number) => void,
    setMin: (value: number) => void
}

export default function RangeSlider({ max, min, selectedMax, selectedMin, label, setMax, setMin }: Props) {

  // TODO: fix logic behind max/min (gets stuck at highest value)
  // TODO: add styling for between values
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const slider = e.target;
        const value = parseInt(slider.value);
        if(slider.classList.contains('slider-min') && !isNaN(value)) {
          if(value && value <= selectedMax) {
            setMin(value);
          }
          else {
            setMin(selectedMax);
          }
        }
        else if(slider.classList.contains('slider-max') && !isNaN(value)) {
          if(value >= selectedMin) {
            setMax(value);
          }
          else {
            setMax(selectedMin);
          }
        }
      }

    return (
        <div className="range_container flex flex-col w-full">
          <p>{label}</p>
            <div className="sliders_control relative min-h-1 my-2">
                <input className="slider-min w-full absolute pointer-events-none appearance-none h-px" type="range" value={selectedMin} min={min} max={max} onChange={handleSliderChange} />
                <input className="slider-max w-full absolute pointer-events-none appearance-none h-0 z-1" type="range" value={selectedMax} min={min} max={max} onChange={handleSliderChange} />
            </div>
            <div className="form_control relative flex justify-between">
                <div className="form_control_container">
                    <div className="form_control_container__time">Min</div>
                    <input className="form_control_container__time__input slider-min" type="number" value={selectedMin} min={min} max={max} onChange={handleSliderChange}/>
                </div>
                <div className="form_control_container">
                    <div className="form_control_container__time">Max</div>
                    <input className="form_control_container__time__input slider-max" type="number" value={selectedMax} min={min} max={max} onChange={handleSliderChange}/>
                </div>
            </div>
        </div>
    )
}
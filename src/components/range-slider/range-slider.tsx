import { useState } from "react";
import './styles.css';

type Props = {
    max: number,
    min: number,
    selectedMax: number,
    selectedMin: number,
    label?: string,
    setMax: (value: number) => void,
    setMin: (value: number) => void,
    includeMinMaxLabels?: boolean
}

export default function RangeSlider({ max, min, selectedMax, selectedMin, label, setMax, setMin, includeMinMaxLabels = true }: Props) {
  const [selectedSlider, setSelectedSlider] = useState('');

  // TODO: fix styling
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const slider = e.target;
        const value = parseInt(slider.value);
        if(slider.classList.contains('slider-min')) {
          if(value >= selectedMax) {
            setMin(selectedMax);
          }
          else {
            setMin(value);
          }
          setSelectedSlider('min');
        }
        else if(slider.classList.contains('slider-max')) {
          if(value <= selectedMin) {
            console.log('set to selected min')
            setMax(selectedMin);
          }
          else {
            setMax(value);
          }
          setSelectedSlider('max');
        }
      }

    return (
        <div className="range_container flex flex-col w-full">
          {label && <p>{label}</p>}
            <div className="sliders_control relative min-h-1 my-2">
                <input className={`slider-min w-full absolute pointer-events-none appearance-none h-px ${selectedSlider === 'min' ? 'z-1' : ''}`} type="range" value={selectedMin} min={min} max={max} onChange={handleSliderChange} />
                <input className={`slider-max w-full absolute pointer-events-none appearance-none h-0 ${selectedSlider === 'max' ? 'z-1' : ''}`} type="range" value={selectedMax} min={min} max={max} onChange={handleSliderChange} />
            </div>
            <div className="form_control relative flex justify-between">
                <div className="form_control_container">
                    {includeMinMaxLabels && <div className="form_control_container__time">Min</div>}
                    <input className="form_control_container__time__input slider-min" type="number" value={selectedMin} min={min} max={max} onChange={handleSliderChange}/>
                </div>
                <div className="form_control_container text-right">
                    {includeMinMaxLabels && <div className="form_control_container__time">Max</div>}
                    <input className="form_control_container__time__input slider-max text-right" type="number" value={selectedMax} min={min} max={max} onChange={handleSliderChange}/>
                </div>
            </div>
        </div>
    )
}

import { useState, useEffect } from "react";

function Hotel() {
    const [processedText, setProcessedText] = useState('');
    const [name, setName] = useState('John');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [textareaHeight, setTextareaHeight] = useState(12); // Default height of textarea
    const [inputValue, setInputValue] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/process_text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: inputValue })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProcessedText(data.processed_text);
        } catch (error) {
            console.error('Error processing text:', error);
        }
    };
    const startSpeechRecognition = () => {
        const recognition = new window.webkitSpeechRecognition(); // For Chrome compatibility
        recognition.lang = "en-US";

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
        };

        recognition.start();
    };

    useEffect(() => {
        if (inputValue.trim() !== '') {
            setTextareaHeight(24);
            setIsVisible(false);
        } else {
            setTextareaHeight(12);
            setIsVisible(true);
        }
    }, [inputValue]);

    return (
        <>
            <div className="font-['Nunito'] bg-[#121212] text-[#D0D0D0] flex flex-col justify-between min-h-screen ">
                <div className="header">LandMark</div>
                <div className="mid text-[#fff] text-left px-8 md:text-center">
                    <div className="font-bold text-4xl inline-flex gap-x-2">Hi <img src='hand emoji.png' alt="hand emoji"/> {name}</div>
                    <div className="font-semibold py-2 row">Happy to see you!</div>
                    <div className="font-medium row">I'm here to assist you during your stay</div>
                </div>
                <div className="assist p-1" >
                    {isVisible && (<div className="hide-scrollbar flex gap-x-5 overflow-x-auto justify-evenly px-2 mb-2">
                        
                        <div className="row flex flex-none align-center w-6">
                            <button className="" onClick={startSpeechRecognition}><img src="Suggestion Change.svg" alt="" /></button>
                        </div>
                        <div className="flex-none">
                            <button className="border-solid border rounded-xl px-2 py-1">what's the wifi password</button>
                        </div>
                        <div className="flex-none">
                            <button className="border-solid border rounded-xl px-2 py-1">what's the check out time</button>
                        </div>
                        <div className="flex-none"><button className="border-solid border rounded-xl px-2 py-1">what's are the compliments</button></div>
                        <div className="flex-none"><button className="border-solid border rounded-xl px-2 py-1">Can i get some water</button></div>
                    </div>)}
                    <div className="row flex p-2 gap-x-2 items-center">
                        {/* {isVisible && (
                            <div className="row flex align-center w-7">
                                <button className="" onClick={startSpeechRecognition}><img src="Suggestion Change.svg" alt="" /></button>
                            </div>
                        )} */}
                        <div className={`row shadow-custom flex w-full px-4 py-2 gap-x-1 md:gap-x-2 border-solid border rounded-xl border-[#A5A5A5] border-opacity-100 bg-[#282828] h-${textareaHeight}`}>
                            <div className="row flex-auto ">
                                <textarea className={`hide-scrollbar w-full bg-transparent resize-none focus:outline-none placeholder-[#D0D0D0] mb-8`} type="search" name="" id="searchtxt" placeholder="Ask Anything..." onFocus={() => setIsInputFocused(true)} value={inputValue} onBlur={() => setIsInputFocused(false)} onChange={handleChange} />
                            </div>
                            <div className="flex items-end lg:gap-x-2">
                                <div className="row flex flex-none w-7 h-7">
                                    <button><img src="Camera.svg" alt="" /></button>
                                </div>
                                <div className="row flex flex-none w-7">
                                    <button id="mic" onClick={startSpeechRecognition}><img src="Mic.svg" alt="" /></button>
                                </div>
                                <div className="row flex flex-none w-7">
                                    <button onClick={handleSubmit}><img src="Send 2.svg" alt="" className={`${isInputFocused ? '' : 'opacity-50'}`} /></button>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </>
    );
}

export default Hotel;

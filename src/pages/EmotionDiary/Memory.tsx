import {AppContext} from '../../AppContext';
import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "react-datepicker/dist/react-datepicker.css";
import "./Memory.css";
import "./MemoryReview";
import { useNavigate } from "react-router-dom";


const Memory = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("App Context missing.");
    const {appData, todayIndex} = context;

    /* retrieve moodScore and summary for last 5 histories */
    const recentEntries = appData.emoDiaryData.filter(item => item.diaryInfo).slice(-5);
    const last5 = recentEntries.map(item => ({
        date: item.date,
        moodScore: item.diaryInfo.moodScore,
        summary: item.diaryInfo.summary,
    }))

    console.log(todayIndex);
    console.log("last5:", last5);;

    const [selectedDate, setSelectedDate] = useState(new Date());   // initialise for diary review
    const [selectedIndex, setSelectedIndex] = useState(0);
    /*const [selected, setSelected] = useState(last5[0] || {
        date: "",
        moodScore: 0,
        summary: "",
    });   // initialise for moodscore and summary quick view*/

    console.log(selectedDate);

    /*const handlePointClick = (data: any) => {
        if (data && data.payload) {
            const item = data.payload;
            setSelected(item);
            console.log("Selected updated:", item);
        }
    };*/

    /*const CustomDot = (props: any) => {
        const { cx, cy, stroke, payload, onClick } = props;

        return (
            <circle
                cx={cx}
                cy={cy}
                r={5}
                stroke={stroke}
                fill="#3b82f6"
                cursor="pointer"
                onClick={() => onClick(payload)}
            />
        );
    };*/

    const navigate = useNavigate();
    const goToMemoryReview = () => {
        navigate ("/memory-review",
            { 
                state: {selectedDate: selectedDate}  // pack up state to pass through routing
            }
        );
    }


    return (
        <div className="memory-container">

            <div className="memory-video-container">
                <video
                    autoPlay
                    muted
                    loop
                    className="memory-background-video"
                >
                    <source src="public/videos/fall.mp4" type="video/mp4" />
                </video>

            {/* date picker installed from react */}
            <div className="date-select-block">
                <h2 className="date-title">select a time capsule ...</h2>

                <DatePicker
                selected={selectedDate}
                onChange={(date) => date && setSelectedDate(date)}  // if no date input, onchange will not execute with false value
                dateFormat="yyyy-MM-dd"
                className="datepicker-input"
                placeholderText="select a time capsule ..."
                /*id="date-picker"
                name="selectedDate"*/
                />
            </div>

            {/* text description */}
            <div>
                <p className="intro-text">
                    <p>In the long stretch of days,</p> 
                    <p>every emotion—whether sparked by trivial matters or great achievements, </p>
                    <p>whether bittersweet or burdensome—threads together the moments of your life, </p>
                    <p>turning them into shining <span className="go-to-diary" onClick={goToMemoryReview}><strong>MEMORIES</strong></span></p>
                </p>
                {/*<button className="go-to-diary" onClick={goToMemoryReview}>
                    push it ...
                </button>*/}
            </div>

            {/* line graph */}
            <div className="chart-block">
                <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={last5}
                    margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
                >
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Line
                    type="monotone"
                    dataKey="moodScore"
                    stroke="#75a2fbff"
                    strokeWidth={3}
                    /*dot={<CustomDot onClick={handlePointClick} />}*/
                    activeDot={{ r: 8 }}
                    />
                </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mood-card">
                <div className="mood-card-left">
                    <span onClick={()=>{selectedIndex>0? setSelectedIndex(selectedIndex-1) : setSelectedIndex(selectedIndex)}}>▲</span>
                    <span onClick={()=>{selectedIndex<4? setSelectedIndex(selectedIndex+1) : setSelectedIndex(selectedIndex)}}>▼</span>
                </div>
                <div className="mood-card-right">
                <div className="mood-date">{last5[selectedIndex].date}</div>
                <div className="mood-summary">{last5[selectedIndex].summary}</div>
                </div>
            </div>

            </div>
        </div>
    );
}

export default Memory;
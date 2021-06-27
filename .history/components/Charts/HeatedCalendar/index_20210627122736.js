import { ResponsiveCalendar, CalendarDayData } from '@nivo/calendar';
import { BasicTooltip } from '@nivo/tooltip';
import { TickFormatter } from '@nivo/axes';



const CalTooltip = ({ date, value, color }) => {
    const dayStr = dayjs(date).format('ll');
    return (
        <BasicTooltip 
            id={dayStr} 
            value={value} 
            color={color} 
            enableChip 
        />
    );
};

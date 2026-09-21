import { effect, useSignal, Signal } from '@preact/signals';
import type { CollectionEntry } from 'astro:content';
import type { SvgComponent } from 'astro/types';

import CheckmarkIcon from '../assets/icons/checkmark-2.svg'
import StrikingIcon from '../assets/icons/striking.svg'
import GrapplingIcon from '../assets/icons/grappling.svg'
import ConditioningIcon from '../assets/icons/dumbell.svg'
import MMAIcon from '../assets/icons/mma.svg'
import Yoga from '../assets/icons/yoga.svg'

type ClassSchedule = CollectionEntry<'schedule'>;
type FilterOptionNames = typeof filterOptionNames[number]
type FilterOptions = { name: FilterOptionNames, icon: SvgComponent & ImageMetadata }
type Days = typeof days[number]

const filterOptionNames = ['all', 'striking', 'grappling', 'conditioning', 'mma', 'yoga'] as const
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const

const filterOptions: FilterOptions[] = [
    { name: 'all', icon: CheckmarkIcon },
    { name: 'striking', icon: StrikingIcon },
    { name: 'grappling', icon: GrapplingIcon },
    { name: 'conditioning', icon: ConditioningIcon },
    { name: 'mma', icon: MMAIcon },
    { name: 'yoga', icon: Yoga }
]

const classTypeColors = {
    'all': '#c0c7d1',
    'striking': '#92CCFF',
    'grappling': '#FFB4AB',
    'conditioning': '#E9C349',
    'mma': '#4497D3',
    'yoga': '#7CC4A5'
}

function ScheduleCard({ color, classItem }: { color: string, classItem: ClassSchedule['data'] }) {
    return (
        <div className="flex flex-col bg-[#1C1B1B] px-3 py-8 gap-2 box-[outline]" style={`border-left: 4px solid ${color};`}>
            <p className="text-[10px] lg:text-[12px]" style={`color: ${color};`}>{classItem.startTime} - {classItem.endTime}</p>
            <p className="text-neutral-1 uppercase text-sm lg:text-lg tracking-[0px] leading-[17.5px]">{classItem.className}</p>
        </div>
    )
}

function ScheduleDayColumn({ day, classSchedule }: { day: Days, classSchedule: ClassSchedule[] }) {
    const todaysSchedule = classSchedule.filter(classItem => classItem.data.classDay === day)

    return (
        <div className="flex flex-col gap-2 grow-1 shrink-1 basis-0" key={day}>
            <p class="text-neutral-1 text-2xl uppercase text-bold p-4 tracking-[1px] tracking-[0px] bg-[#1C1B1B] border-b-[rgba(138, 145, 155, 0.15)] border-b-[1px]" style="border-bottom: rgba(138, 145, 155, 0.15);">{day.slice(0, 3)}</p>
            <div className="flex flex-col gap-2 px-1">
                {todaysSchedule.length < 1
                    ? <p className="text-[10px] text-neutral-1 px-3 py-8 text-center tracking-[2.4px] font-bold uppercase">No classes at this time</p>
                    : todaysSchedule.map(classItem => (
                        <ScheduleCard
                            color={classTypeColors[classItem.data.classTypes[0]]}
                            classItem={classItem.data}
                        />
                    ))}
            </div>
        </div>
    )
}

function ScheduleFilterButton({ selectedFilter, filterOption }: { selectedFilter: Signal<FilterOptionNames>, filterOption: FilterOptions }) {
    return (
        <button
            className="grow-0 shrink-1 basis-[clamp(7rem,20cqw,10.25rem)] py-5 flex flex-col justify-center items-center bg-[#1C1B1B]"
            onClick={() => { selectedFilter.value = filterOption.name }}
            style={`border-bottom: 4px solid ${classTypeColors[filterOption.name] + (filterOption.name === selectedFilter.value ? `; box-shadow: inset 0px 0px 4px 0px rgba(0, 0, 0, 0.8);` : `80`)}`}
        >
            <img className="lg:w-[28px] lg:h-[28px]" src={filterOption.icon.src} style={`opacity: ` + (filterOption.name === selectedFilter.value ? `100%;` : `50%`)} />
            <p className="lg:text-normal text-xs" style={`color: ` + (filterOption.name === selectedFilter.value ? `white` : `#c0c7d1; opacity: 50%;`)}>{filterOption.name.toUpperCase()}</p>
        </button>
    )
}

function filterSchedule(schedule: ClassSchedule[], filter: FilterOptionNames) {
    if (filter === 'all') {
        return schedule
    }

    return schedule.filter(classItem => classItem.data.classTypes.includes(filter))
}

function toMinutes(timeStr: string) {
    const [time, period] = timeStr.trim().split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
    if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;

    return hours * 60 + minutes;
}

export default function WeeklySchedule({ schedule }: { schedule: ClassSchedule[] }) {
    const classSchedule = useSignal(schedule);
    const selectedFilter: Signal<FilterOptionNames> = useSignal('all')

    effect(() => {
        classSchedule.value = filterSchedule(schedule, selectedFilter.value)
        .sort((a, b) => toMinutes(a.data.endTime) - toMinutes(b.data.endTime))
    })

    return (
        <section className="relative flex flex-col items-center justify-center">
            <section className="flex py-32 flex-col items-center gap-4 w-full bg-[#131313]">
                <p className="text-neutral-2 opacity-50 text-md text-bold uppercase">filter by</p>
                <div className="flex flex-wrap justify-center items-stretch gap-4 max-w-[1280px] w-full p-0 [container-type:inline-size] bg-[#131313]">
                    {filterOptions.map((filterOption: FilterOptions) => (
                        <ScheduleFilterButton selectedFilter={selectedFilter} filterOption={filterOption} />
                    ))}
                </div>
            </section>
            <section className="flex flex-col justify-center gap-16 px-4 py-20 w-full">
                <h1 className="text-neutral-1 bg-color-black uppercase font-bold text-4xl text-center">Current Weekly Schedule</h1>
                <div className="flex flex-col lg:flex-row gap-15 p-2 lg:gap-0 bg-[#131313]">
                    {days.map(day => <ScheduleDayColumn day={day} classSchedule={classSchedule.value} />)}
                </div>
            </section>
        </section>
    );
}
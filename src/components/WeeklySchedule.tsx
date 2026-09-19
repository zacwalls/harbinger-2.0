import { useState, useEffect } from 'preact/hooks';
import type { CollectionEntry } from 'astro:content';
import type { SvgComponent } from 'astro/types';

import CheckmarkIcon from '../assets/icons/checkmark-2.svg'
import StrikingIcon from '../assets/icons/striking.svg'
import GrapplingIcon from '../assets/icons/grappling.svg'
import ConditioningIcon from '../assets/icons/dumbell.svg'
import MMAIcon from '../assets/icons/mma.svg'

type ClassSchedule = CollectionEntry<'schedule'>;
type FilterOptionNames = typeof filterOptionNames[number]
type FilterOptions = { name: FilterOptionNames, icon: SvgComponent & ImageMetadata }

const filterOptionNames = ['all', 'striking', 'grappling', 'conditioning', 'mma'] as const

const filterOptions: FilterOptions[] = [
    { name: 'all', icon: CheckmarkIcon },
    { name: 'striking', icon: StrikingIcon },
    { name: 'grappling', icon: GrapplingIcon },
    { name: 'conditioning', icon: ConditioningIcon },
    { name: 'mma', icon: MMAIcon },
]

const classTypeColors = {
    'all': '#c0c7d1',
    'striking': '#92CCFF',
    'grappling': '#FFB4AB',
    'conditioning': '#E9C349',
    'mma': '#4497D3'
}

function ScheduleCard({ color, classItem }: { color: string, classItem: ClassSchedule['data'] }) {
    return (
        <div className="flex flex-col bg-[#1C1B1B] px-3 py-8 gap-2 box-[outline]" style={`border-left: 4px solid ${color};`}>
            <p className="text-[10px]" style={`color: ${color};`}>{classItem.startTime} - {classItem.endTime}</p>
            <p className="text-neutral-1 uppercase text-sm lg:text-normal tracking-[0px] leading-[17.5px]">{classItem.className}</p>
        </div>
    )
}

export default function WeeklySchedule({ schedule }: { schedule: ClassSchedule[] }) {
    const [classSchedule, setClassSchedule] = useState(schedule);
    const [selectedFilter, setSelectedFilter] = useState("all" as FilterOptionNames);

    useEffect(() => {
        async function fetchClasses() {
            const filteredClasses = selectedFilter === "all" ? schedule : schedule.filter((classItem) => classItem.data.classTypes.includes(selectedFilter));
            setClassSchedule(filteredClasses);
        }
        fetchClasses();
    }, [selectedFilter]);

    return (
        <section className="relative flex flex-col items-center justify-center px-4 py-20">
            <section className="flex py-16 flex-col items-center gap-4 w-full">
                <p className="text-neutral-2 opacity-50 text-md text-bold uppercase">filter by</p>
                <div className="flex flex-wrap justify-center items-stretch gap-4 max-w-[1280px] w-full p-0 [container-type:inline-size]">
                    {filterOptions.map((filterOption: FilterOptions) => (
                        <button
                            className="grow-0 shrink-1 basis-[clamp(7rem,20cqw,10.25rem)] py-5 flex flex-col justify-center items-center bg-[#1C1B1B]"
                            onClick={() => setSelectedFilter(filterOption.name)}
                            style={(filterOption.name === selectedFilter ? `border` : `border-bottom`) + `: 4px solid ${classTypeColors[filterOption.name]}`}
                        >
                            <img src={filterOption.icon.src} />
                            <p className="text-xs" style={`color: ` + (filterOption.name === selectedFilter ? `white` : `#c0c7d1; opacity: 50%;`)}>{filterOption.name.toUpperCase()}</p>
                        </button>
                    ))}
                </div>
            </section>
            <section className="flex flex-col justify-center gap-16 px-4 py-20 w-full">
                <h1 className="text-neutral-1 bg-color-black uppercase font-bold text-3xl text-center">Current Weekly Schedule</h1>
                <div className="flex flex-col lg:flex-row gap-15 p-2 lg:gap-0 bg-[#131313]">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div className="flex flex-col gap-2 grow-1 shrink-1 basis-0" key={day}>
                            <p class="text-neutral-1 text-2xl lg:text-lg uppercase text-bold p-4 tracking-[1px] tracking-[0px] bg-[#1C1B1B] border-b-[rgba(138, 145, 155, 0.15)] border-b-[1px]" style="border-bottom: rgba(138, 145, 155, 0.15);">{day.slice(0,3)}</p>
                            <div className="flex flex-col gap-2 px-1">
                                {classSchedule.filter(classItem => classItem.data.classDay === day).map(classItem => (
                                    <ScheduleCard
                                        color={classTypeColors[classItem.data.classTypes[0]]}
                                        classItem={classItem.data}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
}
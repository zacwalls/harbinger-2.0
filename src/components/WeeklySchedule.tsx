import type { CollectionEntry } from 'astro:content';
import { useState, useEffect } from 'preact/hooks';

type ClassSchedule = CollectionEntry<'schedule'>;
const filterOptions = ['all', 'striking', 'grappling', 'conditioning', 'mma'] as const
type FilterOptions = typeof filterOptions[number]

export default function WeeklySchedule({ schedule }: { schedule: ClassSchedule[] }) {
    const [classSchedule, setClassSchedule] = useState(schedule);
    const [selectedFilter, setSelectedFilter] = useState("all" as FilterOptions);

    useEffect(() => {
        async function fetchClasses() {
            const filteredClasses = selectedFilter === "all" ? schedule : schedule.filter((classItem) => classItem.data.classTypes.includes(selectedFilter));
            setClassSchedule(filteredClasses);
        }
        fetchClasses();
    }, [selectedFilter]);

    return (
        <div className="relative flex items-start justify-left py-20 overflow-hidden">
            <div>
                <div>
                    {filterOptions.map((filterOption: FilterOptions) => (
                        <div>
                            <label>{filterOption.toUpperCase()}</label>
                            <input
                                type="radio"
                                name="filter"
                                value={filterOption}
                                onClick={() => {
                                    setSelectedFilter(filterOption)
                                    console.log(filterOption)
                                }}
                                checked={filterOption === selectedFilter}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h1>Current Weekly Schedule</h1>
                {classSchedule.map((classItem, index) => (
                    <div>
                        <p>{ classItem.data.startTime } - {classItem.data.endTime}</p>
                        <p key={index}>{classItem.data.className}</p>
                        <div>{classItem.data.classTypes[1]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
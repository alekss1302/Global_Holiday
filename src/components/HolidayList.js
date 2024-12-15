import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './HolidayList.css';

const HolidayList = () => {
    const { t } = useTranslation();
    const [holidays, setHolidays] = useState([]);
    const [filteredHolidays, setFilteredHolidays] = useState([]);
    const [todayHolidays, setTodayHolidays] = useState([]);
    const [upcomingHolidays, setUpcomingHolidays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [sortOption, setSortOption] = useState('');
    const [modalData, setModalData] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const fetchHolidays = async () => {
            const result = await axios.get('https://date.nager.at/Api/v2/NextPublicHolidaysWorldwide');
            setHolidays(result.data);
            setFilteredHolidays(result.data);

            const today = new Date().toISOString().split('T')[0];
            setTodayHolidays(result.data.filter(holiday => holiday.date === today));
            setUpcomingHolidays(result.data.filter(holiday => holiday.date !== today));
            setIsLoading(false);
        };

        fetchHolidays();
    }, []);

    useEffect(() => {
        let filtered = holidays.filter(holiday =>
            holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCountry === 'All' || holiday.countryCode === selectedCountry) &&
            (selectedType === 'All' || holiday.types.includes(selectedType))
        );

        if (startDate && endDate) {
            filtered = filtered.filter(holiday => {
                const holidayDate = new Date(holiday.date);
                return holidayDate >= startDate && holidayDate <= endDate;
            });
        }

        if (sortOption) {
            filtered.sort((a, b) => {
                if (sortOption === 'name') return a.name.localeCompare(b.name);
                if (sortOption === 'date') return new Date(a.date) - new Date(b.date);
                return 0;
            });
        }

        setFilteredHolidays(filtered);

        const today = new Date().toISOString().split('T')[0];
        setTodayHolidays(filtered.filter(holiday => holiday.date === today));
        setUpcomingHolidays(filtered.filter(holiday => holiday.date !== today));
    }, [searchTerm, selectedCountry, selectedType, startDate, endDate, sortOption, holidays]);

    const handleOpenModal = (holiday) => {
        setModalData(holiday);
    };

    const handleCloseModal = () => {
        setModalData(null);
    };

    if (isLoading) {
        return <p>{t('loading')}</p>;
    }

    const uniqueCountries = [...new Set(holidays.map(holiday => holiday.countryCode))];
    const uniqueTypes = [...new Set(holidays.flatMap(holiday => holiday.types))];

    return (
        <div className="holiday-list">
            <div className="filters">
                <input
                    type="text"
                    placeholder={t('searchHolidays')}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
                    <option value="All">{t('allCountries')}</option>
                    {uniqueCountries.map(country => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                    <option value="All">{t('allTypes')}</option>
                    {uniqueTypes.map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <select onChange={e => setSortOption(e.target.value)} value={sortOption}>
                    <option value="">{t('sortBy')}</option>
                    <option value="name">{t('name')}</option>
                    <option value="date">{t('date')}</option>
                </select>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText={t('startDate')}
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText={t('endDate')}
                />
            </div>
            <div className="today-holidays card">
                <h2>{t('todayHolidays')}</h2>
                {todayHolidays.length > 0 ? todayHolidays.map(holiday => (
                    <div key={holiday.date + holiday.localName} className="holiday-item">
                        <h3>{holiday.name}</h3>
                        <button className="details" onClick={() => handleOpenModal(holiday)}>
                            {t('details')}
                        </button>
                    </div>
                )) : <p>{t('noHolidaysToday')}</p>}
            </div>
            <div className="upcoming-holidays card">
                <h2>{t('upcomingHolidays')}</h2>
                {upcomingHolidays.length > 0 ? upcomingHolidays.map(holiday => (
                    <div key={holiday.date + holiday.localName} className="holiday-item">
                        <h3>{holiday.name}</h3>
                        <button className="details" onClick={() => handleOpenModal(holiday)}>
                            {t('details')}
                        </button>
                    </div>
                )) : <p>{t('noUpcomingHolidays')}</p>}
            </div>
            {modalData && <Modal holiday={modalData} onClose={handleCloseModal} />}
        </div>
    );
};

export default HolidayList;

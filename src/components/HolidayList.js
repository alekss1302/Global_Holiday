import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './HolidayList.css';

const API_URL = 'https://date.nager.at/api/v3/NextPublicHolidaysWorldwide';

const toLocalIsoDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const toDate = (isoDate) => new Date(`${isoDate}T00:00:00`);

const HolidayList = () => {
    const { t } = useTranslation();

    const [holidays, setHolidays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadFailed, setLoadFailed] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [sortOption, setSortOption] = useState('date');
    const [modalData, setModalData] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const fetchHolidays = async () => {
            setIsLoading(true);
            setLoadFailed(false);

            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`Holiday API returned ${response.status}`);
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Holiday API returned an unexpected response');
                }

                if (!cancelled) {
                    setHolidays(data);
                }
            } catch (error) {
                console.error('Unable to load holiday data:', error);

                if (!cancelled) {
                    setHolidays([]);
                    setLoadFailed(true);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        fetchHolidays();

        return () => {
            cancelled = true;
        };
    }, [retryCount]);

    const uniqueCountries = useMemo(() => {
        return [...new Set(holidays.map(holiday => holiday.countryCode))]
            .filter(Boolean)
            .sort();
    }, [holidays]);

    const uniqueTypes = useMemo(() => {
        return [...new Set(
            holidays.flatMap(holiday => Array.isArray(holiday.types) ? holiday.types : [])
        )].sort();
    }, [holidays]);

    const filteredHolidays = useMemo(() => {
        let filtered = holidays.filter(holiday => {
            const name = holiday.name || '';
            const localName = holiday.localName || '';
            const types = Array.isArray(holiday.types) ? holiday.types : [];

            const matchesSearch =
                name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                localName.toLowerCase().includes(searchTerm.trim().toLowerCase());

            const matchesCountry =
                selectedCountry === 'All' || holiday.countryCode === selectedCountry;

            const matchesType =
                selectedType === 'All' || types.includes(selectedType);

            const holidayDate = toDate(holiday.date);
            const matchesStart = !startDate || holidayDate >= startDate;
            const matchesEnd = !endDate || holidayDate <= endDate;

            return (
                matchesSearch &&
                matchesCountry &&
                matchesType &&
                matchesStart &&
                matchesEnd
            );
        });

        filtered = [...filtered].sort((a, b) => {
            if (sortOption === 'name') {
                return (a.name || '').localeCompare(b.name || '');
            }

            return toDate(a.date) - toDate(b.date);
        });

        return filtered;
    }, [
        holidays,
        searchTerm,
        selectedCountry,
        selectedType,
        sortOption,
        startDate,
        endDate
    ]);

    const today = toLocalIsoDate(new Date());

    const todayHolidays = filteredHolidays.filter(
        holiday => holiday.date === today
    );

    const upcomingHolidays = filteredHolidays.filter(
        holiday => holiday.date > today
    );

    const countryCount = new Set(
        filteredHolidays.map(holiday => holiday.countryCode)
    ).size;

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCountry('All');
        setSelectedType('All');
        setSortOption('date');
        setStartDate(null);
        setEndDate(null);
    };

    if (isLoading) {
        return (
            <section className="status-panel" aria-live="polite">
                <div className="loading-dot" />
                <div>
                    <h2>{t('loading')}</h2>
                    <p>{t('loadingDescription')}</p>
                </div>
            </section>
        );
    }

    if (loadFailed) {
        return (
            <section className="status-panel error-panel" role="alert">
                <div>
                    <span className="status-label">{t('connectionIssue')}</span>
                    <h2>{t('loadError')}</h2>
                    <p>{t('loadErrorDescription')}</p>
                    <button
                        className="primary-button"
                        type="button"
                        onClick={() => setRetryCount(count => count + 1)}
                    >
                        {t('retry')}
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="holiday-list">
            <div className="summary-grid">
                <article className="summary-card">
                    <span>{t('results')}</span>
                    <strong>{filteredHolidays.length}</strong>
                    <small>{t('matchingHolidays')}</small>
                </article>

                <article className="summary-card">
                    <span>{t('countries')}</span>
                    <strong>{countryCount}</strong>
                    <small>{t('representedCountries')}</small>
                </article>

                <article className="summary-card">
                    <span>{t('dataWindow')}</span>
                    <strong>{t('nextDays')}</strong>
                    <small>{t('worldwideFeed')}</small>
                </article>
            </div>

            <div className="filter-panel">
                <div className="filter-heading">
                    <div>
                        <span className="section-kicker">{t('explore')}</span>
                        <h2>{t('findHoliday')}</h2>
                    </div>

                    <button
                        className="text-button"
                        type="button"
                        onClick={resetFilters}
                    >
                        {t('resetFilters')}
                    </button>
                </div>

                <div className="filters">
                    <label className="search-field">
                        <span>{t('search')}</span>
                        <input
                            type="search"
                            placeholder={t('searchHolidays')}
                            value={searchTerm}
                            onChange={event => setSearchTerm(event.target.value)}
                        />
                    </label>

                    <label>
                        <span>{t('country')}</span>
                        <select
                            value={selectedCountry}
                            onChange={event => setSelectedCountry(event.target.value)}
                        >
                            <option value="All">{t('allCountries')}</option>
                            {uniqueCountries.map(country => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        <span>{t('type')}</span>
                        <select
                            value={selectedType}
                            onChange={event => setSelectedType(event.target.value)}
                        >
                            <option value="All">{t('allTypes')}</option>
                            {uniqueTypes.map(type => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        <span>{t('sortBy')}</span>
                        <select
                            value={sortOption}
                            onChange={event => setSortOption(event.target.value)}
                        >
                            <option value="date">{t('sortDate')}</option>
                            <option value="name">{t('sortName')}</option>
                        </select>
                    </label>

                    <label>
                        <span>{t('startDate')}</span>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText={t('startDate')}
                        />
                    </label>

                    <label>
                        <span>{t('endDate')}</span>
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText={t('endDate')}
                        />
                    </label>
                </div>
            </div>

            <HolidaySection
                title={t('todayHolidays')}
                subtitle={t('todaySubtitle')}
                holidays={todayHolidays}
                emptyText={t('noHolidaysToday')}
                onOpen={setModalData}
                detailsLabel={t('details')}
            />

            <HolidaySection
                title={t('upcomingHolidays')}
                subtitle={t('upcomingSubtitle')}
                holidays={upcomingHolidays}
                emptyText={t('noUpcomingHolidays')}
                onOpen={setModalData}
                detailsLabel={t('details')}
            />

            {modalData && (
                <Modal
                    holiday={modalData}
                    onClose={() => setModalData(null)}
                />
            )}
        </section>
    );
};

const HolidaySection = ({
    title,
    subtitle,
    holidays,
    emptyText,
    onOpen,
    detailsLabel
}) => {
    return (
        <section className="holiday-section">
            <div className="section-heading">
                <div>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                <span className="result-count">{holidays.length}</span>
            </div>

            {holidays.length === 0 ? (
                <div className="empty-state">{emptyText}</div>
            ) : (
                <div className="holiday-grid">
                    {holidays.map(holiday => {
                        const types = Array.isArray(holiday.types)
                            ? holiday.types
                            : [];

                        return (
                            <article
                                key={`${holiday.date}-${holiday.countryCode}-${holiday.localName}`}
                                className="holiday-card"
                            >
                                <div className="holiday-card-top">
                                    <span className="date-badge">
                                        {toDate(holiday.date).toLocaleDateString(
                                            undefined,
                                            {
                                                weekday: 'short',
                                                day: 'numeric',
                                                month: 'short'
                                            }
                                        )}
                                    </span>

                                    <span className="country-badge">
                                        {holiday.countryCode}
                                    </span>
                                </div>

                                <div className="holiday-card-body">
                                    <h3>{holiday.name}</h3>

                                    {holiday.localName &&
                                        holiday.localName !== holiday.name && (
                                            <p className="local-name">
                                                {holiday.localName}
                                            </p>
                                        )}

                                    {types.length > 0 && (
                                        <div className="type-list">
                                            {types.map(type => (
                                                <span key={type}>{type}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="details-button"
                                    type="button"
                                    onClick={() => onOpen(holiday)}
                                >
                                    {detailsLabel}
                                </button>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default HolidayList;

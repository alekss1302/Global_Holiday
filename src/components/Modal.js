import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Modal.css';

const Modal = ({ holiday, onClose }) => {
    const { t } = useTranslation();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const types = Array.isArray(holiday.types) ? holiday.types : [];

    return (
        <div
            className="modal-overlay"
            onMouseDown={handleOverlayClick}
            role="presentation"
        >
            <section
                className="modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="holiday-modal-title"
            >
                <button
                    className="modal-close"
                    type="button"
                    onClick={onClose}
                    aria-label={t('close')}
                >
                    ×
                </button>

                <span className="modal-country">{holiday.countryCode}</span>

                <h2 id="holiday-modal-title">{holiday.name}</h2>

                {holiday.localName && holiday.localName !== holiday.name && (
                    <p className="modal-local-name">{holiday.localName}</p>
                )}

                <dl className="holiday-details">
                    <div>
                        <dt>{t('date')}</dt>
                        <dd>{holiday.date}</dd>
                    </div>

                    <div>
                        <dt>{t('countryCode')}</dt>
                        <dd>{holiday.countryCode}</dd>
                    </div>

                    <div>
                        <dt>{t('scope')}</dt>
                        <dd>{holiday.global ? t('national') : t('regional')}</dd>
                    </div>

                    <div>
                        <dt>{t('holidayType')}</dt>
                        <dd>{types.length > 0 ? types.join(', ') : t('notAvailable')}</dd>
                    </div>
                </dl>

                <button
                    className="modal-action"
                    type="button"
                    onClick={onClose}
                >
                    {t('close')}
                </button>
            </section>
        </div>
    );
};

export default Modal;

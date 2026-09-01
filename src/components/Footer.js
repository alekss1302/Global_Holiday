import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div>
                    <span className="footer-label">{t('aboutProject')}</span>
                    <p>{t('aboutProjectDescription')}</p>
                </div>

                <div className="footer-links">
                    <a
                        href="https://github.com/alekss1302/Global_Holiday"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://date.nager.at/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Nager.Date API
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© {year} Global Holiday Finder</span>
                <span>{t('personalProject')}</span>
            </div>
        </footer>
    );
};

export default Footer;

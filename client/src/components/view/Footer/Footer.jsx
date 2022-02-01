/* eslint-disable jsx-a11y/anchor-is-valid */
import { FacebookOutlined, GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons'
import React from 'react'
import './FooterStyle.css'
function Footer() {
    return (
        <div className="footer-wr">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
            <div className="footer-content">
                <div className="social-media-icon">
                    <a href="#" target="_blank"><FacebookOutlined /></a>
                    <a href="#" target="_blank"><TwitterOutlined /></a>
                    <a href="#" target="_blank"><LinkedinOutlined /></a>
                    <a href="#" target="_blank"><GithubOutlined /></a>
                </div>
                <div className="power-by">
                    <p>
                        PowerBy <span> Hùng víp prồ</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer

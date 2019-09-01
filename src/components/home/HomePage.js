import React from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css';

const HomePage = () => (
    <div className="mx-1">
        <MainSection />
        <StartSection />
        <LoverSection />
        <AboutSection />
        <RestrictionsSection />
        <ContactSection />
    </div>
);

const LoverSection = () => (
    <div className="container container-home text-center">
        <div className="row">
            <div className="col-md-6 align-self-center">
                <img
                    src="https://i.scdn.co/image/e30b81b756002dffe808888a4b67461e15e67681"
                    className="ranking-example pl-3 py-3"
                    alt="Lover"
                />
            </div>
            <div className="col-md-6 align-self-center">
                <h1 className="display-5">
                    And there's also the healthier option: <i>Lover</i> is out
                    now!
                </h1>
                <h3>
                    Taylor's seventh studio album is also her most critically
                    acclaimed body of work up to date.
                </h3>
                <h5>
                    Can you choose your favorite <b>13</b> Lover songs?
                </h5>
                <h5>The good ones never wait, so...</h5>
                <div className="btn-group mr-2" role="group">
                    <Link
                        className="btn btn-lg btn-outline-dark badge-pill"
                        to="/select?album=lover"
                    >
                        Start Now!
                    </Link>
                    <a
                        className="btn btn-lg btn-outline-dark badge-pill"
                        href="https://taylorswift.lnk.to/loverWe"
                    >
                        STREAM LOVER
                    </a>
                </div>
            </div>
        </div>
    </div>
);

const MainSection = () => (
    <div className="container container-home text-center">
        <h1 className="display-2">Taylor Swift Ranked</h1>
        <h3>
            Singer-songwriter Taylor Swift has released seven studio albums and
            a handful of singles throughout her career.
        </h3>
        <h5>
            Can you choose your favorite <b>13</b> songs out of her discography?
        </h5>
    </div>
);

const AboutSection = () => (
    <div className="container container-home">
        <div className="row">
            <div className="col-lg-6">
                <h1 className="display-4">And that's how it works...</h1>
                <h4>
                    It's pretty simple: select 13 songs and reorder them from
                    favorite to least favorite. In the end, you'll be able to
                    generate a cool image you can use to share on social media.
                    Here's an example of how it should look like: my ranking!
                </h4>
                <h5>
                    If you share yours on Twitter, Tumblr or other social media,
                    use the hashtag <b>#TaylorSwiftRanked</b> so that I can
                    check it out!{' '}
                    <a
                        href="https://breathedintheinvisiblesmoke.tumblr.com"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Here's mine posted on Tumblr!
                    </a>
                </h5>
                <h5>
                    After you finish your Top 13, it will be sent to an{' '}
                    <a
                        href="/ranking"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        overall ranking
                    </a>{' '}
                    made with all submissions. Let's see how your favorite
                    tracks compare to other people's favorites!
                </h5>
            </div>
            <div className="col-lg-6 align-self-center">
                <img
                    src="assets/tsranked-top13-example.png"
                    className="ranking-example"
                    alt="My ranking"
                />
            </div>
        </div>
    </div>
);

const RestrictionsSection = () => (
    <section className="container container-home">
        <h1>
            Wait, where's <i>[unreleased 2005 demo song]</i>?
        </h1>
        <h5>
            Note that only tracks that were officially released by Taylor are
            listed. Another little restriction was to only include songs in
            which she was credited as one of the writers, being the reason why
            all of her officially released covers are not listed (except for{' '}
            <i>Untouchable</i> since she earned a writing credit for it).
        </h5>
    </section>
);

const ContactSection = () => (
    <section className="container container-home">
        <h1>Contact</h1>
        <div className="row">
            <div className="col-lg-7">
                <h5>
                    As a fellow Swiftie, find me on <b>Twitter</b> or{' '}
                    <b>Tumblr</b>. Hey, let's be friends!
                </h5>
                <h5>
                    As a developer, you can find me on <b>GitHub</b>. If you
                    have any issues using this tool, please, contact me!
                </h5>
            </div>
            <div className="col-lg-5">
                <SocialMediaButton
                    text="Twitter (@SoftCircuits)"
                    href="https://twitter.com/SoftCircuits"
                />
                <SocialMediaButton
                    text="Tumblr (@breathedintheinvisiblesmoke)"
                    href="https://breathedintheinvisiblesmoke.tumblr.com"
                />
                <SocialMediaButton
                    text="GitHub (/JRobsonJr)"
                    href="https://github.com/JRobsonJr"
                />
            </div>
        </div>
    </section>
);

const SocialMediaButton = ({ text, href }) => (
    <a
        className="btn btn-block btn-outline-dark badge-pill"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
    >
        {text}
    </a>
);

const StartSection = () => (
    <section className="container container-home text-center">
        <h5>I don't think you should wait. I think you should...</h5>
        <Link className="btn btn-lg btn-outline-dark badge-pill" to="/select">
            START NOW!
        </Link>
    </section>
);

export default HomePage;

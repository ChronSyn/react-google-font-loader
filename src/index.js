import React from 'react';
import PropTypes from 'prop-types';

class GoogleFontLoader extends React.PureComponent {
    link = null;

    createLink = () => {
        const { fonts } = this.props;

        const families = fonts.reduce((acc, font) => {
            const family = font.font.replace(/ +/g, '+');
            const weights = (font.weights || []).join(',');
            const subsets = (font.subsets || []).join(',');

            acc.push(family + (weights && `:${weights}`) + (subsets && `&subset=${subsets}`));

            return acc;
        }, []).join('|');

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css?family=${families}`;

        return link;
    }

    appendLink = () => document.head.appendChild(this.link);

    removeLink = () => document.head.removeChild(this.link);

    replaceLink = () => {
        this.removeLink();
        this.link = this.createLink();
        this.appendLink();
    }

    componentDidMount () {
        this.link = this.createLink();
        this.appendLink();
    }

    componentDidUpdate (prevProps) {
        if (JSON.stringify(prevProps.fonts) !== JSON.stringify(this.props.fonts)) {
            this.replaceLink();
        }
    }

    componentWillUnmount () {
        this.removeLink();
    }

    render = () => null;
}

GoogleFontLoader.propTypes = {
    fonts: PropTypes.arrayOf(
        PropTypes.shape({
            font: PropTypes.string.isRequired,
            weights: PropTypes.arrayOf(PropTypes.string),
            subsets: PropTypes.arrayOf(PropTypes.string),
        }),
    ).isRequired,
};

export default GoogleFontLoader;

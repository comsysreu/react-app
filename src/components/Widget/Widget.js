import React from 'react';
import s from './Widget.module.scss';
import uuidv4 from 'uuid/v4'

class Widget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            randomId: uuidv4(),
            hideWidget: false,
            collapseWidget: !!props.collapsed,
            height: props.collapsed ? 0 : 'auto',
            fullscreened: false,
            reloading: false,
            modal: false,
            apiData: ''
        }

    }

    render() {

        const {
            title,
            className,
            children,
            close,
            fullscreen,
            collapse,
            refresh,
            settings,
            settingsInverse,
            tooltipPlacement,
            showTooltip,
            bodyClass,
            customControls,
            customClose,
            customExpand,
            customCollapse,
            customFullscreen,
            customReload,
            fetchingData,
            customDropDown,
            customBody,
            prompt,
            collapsed,
            widgetType,
            updateWidgetData,
            options, //eslint-disable-line
            ...attributes
          } = this.props;

        const {
            reloading,
            fullscreened,
            randomId,
            height,
            hideWidget,
            collapseWidget,
            modal,
        } = this.state;

        return (<React.Fragment>
            <section
                // style={{ display: hideWidget ? 'none' : '' }}
                // className={
                //     classNames('widget', { 'fullscreened': !!fullscreened, 'collapsed': !!collapseWidget }, s.widget, className, (reloading || fetchingData) ? s.reloading : '')
                // } {...attributes}
            >
                {
                    title && (
                        typeof title === 'string'
                            ? <h5 className={s.title}>{title}</h5>
                            : <header className={s.title}>{title}</header>
                    )
                }
            </section>
        </React.Fragment>);
    }

}

export default Widget;
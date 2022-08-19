import { Props } from './Sidebar.types';
import { baseTheme, breakpoints } from '../../styles/theme/theme';
import { useLayoutEffect, useRef } from 'react';
import { usePersistedState } from '../../hooks/usePersistedState';
import { useResize } from '../../hooks/useResize';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useEventListener } from '../../hooks/useEventListener';

import { Container, OptionsList, Resizer } from './Sidebar.styled';

import { InboxSolidIcon as InboxIcon } from '../Icons/InboxSolidIcon';
import { CalendarDayIcon as TodayIcon } from '../Icons/CalendarDayIcon';
import { CalendarIcon as UpcomingIcon } from '../Icons/CalendarIcon';
import { LabelIcon as FiltersAndLabelsIcon } from '../Icons/LabelIcon';
import { ProjectOption } from './Options/ProjectsOption/ProjectOption.component';
import { Option } from './Options/Option/Option.component';
import { useNavigate } from 'react-router-dom';
import { globalActions, useAppDispatch, useAppSelector } from '../../redux/store';

export function Sidebar(props: Props): JSX.Element {
  // const { isSidebarOpen, toggleSidebar } = props;
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((state) => state);
  const { colors } = baseTheme;

  const windowWidth = useWindowSize().width;
  const oldWindowWidthRef = useRef<number>();
  const breakpointMd = parseInt(breakpoints.md, 10);

  useLayoutEffect(() => {
    return () => {
      oldWindowWidthRef.current = windowWidth;
    };
  });

  // automaticly sidebar close when screen resize to brakpoint < lg
  useEventListener('resize', () => {
    if (windowWidth && oldWindowWidthRef.current) {
      if (
        isSidebarOpen &&
        windowWidth < breakpointMd &&
        oldWindowWidthRef.current > breakpointMd
      ) {
        console.log('cu');
        setTimeout(() => dispatch(globalActions.toggleSidebar()), 100);
      }
    }
  });

  const initialWidth = '35.1rem';
  const maxWidthRem = 50;
  const minWidthRem = 27;

  const [persistedWidth, setPersistedWidth] = usePersistedState(
    'sidebar-width',
    initialWidth
  );

  const [setRef, resizeabledWidth] = useResize(
    { direction: 'right', max: maxWidthRem * 10, min: minWidthRem * 10 },
    persistedWidth
  );

  // fix a possible bug that break the max and min value width to sidebar
  useLayoutEffect(() => {
    if (parseInt(persistedWidth, 10) > maxWidthRem) {
      setPersistedWidth(maxWidthRem + 'rem');
    }

    if (parseInt(persistedWidth) < minWidthRem) {
      setPersistedWidth(minWidthRem + 'rem');
    }
  }, [persistedWidth, setPersistedWidth]);

  useLayoutEffect(() => {
    setPersistedWidth(resizeabledWidth);
  }, [resizeabledWidth, setPersistedWidth]);

  const navigate = useNavigate();

  return (
    <Container
      ref={setRef.element}
      isSidebarOpen={isSidebarOpen}
      initialWidth={initialWidth}
      resizeabledWidth={persistedWidth}
    >
      <Resizer ref={setRef.right} />
      <OptionsList>
        <Option todoCount={23} onClick={() => console.log('/inbox')}>
          <InboxIcon fill={colors.blue} />
          Inbox
        </Option>

        <Option todoCount={21} onClick={() => navigate('/today')}>
          <TodayIcon fill={colors.green} />
          Today
        </Option>

        <Option todoCount={12} onClick={() => navigate('/upcoming')}>
          <UpcomingIcon fill={colors.purple} />
          Upcoming
        </Option>

        <Option todoCount={53} onClick={() => navigate('/filter&labels')}>
          <FiltersAndLabelsIcon fill={colors.orange} />
          Filters & Labels
        </Option>

        <ProjectOption />
      </OptionsList>
    </Container>
  );
}
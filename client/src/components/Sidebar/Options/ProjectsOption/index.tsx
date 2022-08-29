import { useRef } from 'react';
import { useHover } from '../../../../hooks/useHover';
import { useToggle } from '../../../../hooks/useToggle';
import { uiActions, useAppDispatch } from '../../../../redux/store';

import { Content as OptionTitle } from '../Option/styled';
import {
  Container,
  OptionContent,
  OpenProjectsListLayer,
  AddProjectButton,
  IconContainer,
} from './styled';
import { AllProjectsList } from './AllProjects/AllProjectList';
import { AllProjectsItem } from './AllProjects/AllProjectItem';

import {
  PlusSolidIcon as AddProjectIcon,
  ChevronDownIcon as ChevronIcon,
} from '../../../Icons';

interface Props {
  setShouldShowModal: () => void;
}

export function ProjectOption(props: Props): JSX.Element {
  const { setShouldShowModal } = props;
  const [isAllProjectsListOpen, setIsAllProjectsListOpen] = useToggle(false);

  const projectOptionRef = useRef<HTMLDivElement | null>(null);
  const AddProjectButtonRef = useRef<HTMLDivElement | null>(null);

  const isProjectOptionHover = useHover(projectOptionRef);
  const isProjectOptionButtonHover = useHover(AddProjectButtonRef);

  const dispatch = useAppDispatch();

  const icon16px = '1.6rem';

  return (
    <Container ref={projectOptionRef}>
      <OptionContent>
        <OpenProjectsListLayer onClick={() => setIsAllProjectsListOpen()} />

        <OptionTitle>
          <IconContainer isAllProjectsListOpen={isAllProjectsListOpen}>
            <ChevronIcon />
          </IconContainer>
          Projects
        </OptionTitle>

        <AddProjectButton
          ref={AddProjectButtonRef}
          isProjectHover={isProjectOptionHover}
          isProjectButtonHover={isProjectOptionButtonHover}
          onClick={setShouldShowModal}
        >
          <AddProjectIcon width={icon16px} height={icon16px} />
        </AddProjectButton>
      </OptionContent>

      <AllProjectsList isAllProjectsListOpen={isAllProjectsListOpen}>
        <AllProjectsItem isAllProjectsListOpen={isAllProjectsListOpen}>
          Project 1
        </AllProjectsItem>

        <AllProjectsItem isAllProjectsListOpen={isAllProjectsListOpen}>
          Project 2
        </AllProjectsItem>

        <AllProjectsItem isAllProjectsListOpen={isAllProjectsListOpen}>
          Project 3
        </AllProjectsItem>
      </AllProjectsList>
    </Container>
  );
}

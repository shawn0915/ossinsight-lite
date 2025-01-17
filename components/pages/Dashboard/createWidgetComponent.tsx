import { DashboardContext } from '@/components/pages/Dashboard/context';
import { EditingLayer } from '@/components/pages/Dashboard/EditingLayer';
import ExploreLayer from '@/components/pages/Dashboard/ExploreLayer';
import { useLibraryItemField } from '@/store/features/library';
import { useWidget } from '@/store/features/widgets';
import clsx from 'clsx';
import { forwardRef, ReactElement, useContext } from 'react';
import { WidgetCoordinator } from './WidgetCoordinator';

export interface WidgetComponentProps {
  id: string;
  className?: string;
}

export const WidgetComponent = forwardRef<HTMLDivElement, WidgetComponentProps>(({ ...componentProps }, ref) => {
  let el: ReactElement;

  const { editing } = useContext(DashboardContext);

  const { id, className, ...rest } = componentProps;

  const { name, props: itemProps } = useLibraryItemField(id, ({ name, props }) => ({
    name, props,
  }));

  const { showBorder, ...props } = itemProps;
  const widget = useWidget(name);

  el = <WidgetCoordinator name={name} _id={id} props={{ ...props, className: clsx('w-full h-full', props.className) }} ref={ref} />;

  if (editing) {
    el = (
      <>
        {el}
        <EditingLayer
          id={id}
        />
      </>
    );
  } else {
    el = (
      <>
        {el}
        <ExploreLayer id={id} />
      </>
    );
  }

  return (
    <div className={clsx('widget-wrapper', { 'show-border': showBorder }, className)} {...rest}>
      {el}
    </div>
  );
});

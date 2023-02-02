import { useEffect, useRef, memo } from 'react';

import clsx from 'clsx';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import BlazeSlider, { type MediaConfig, type BlazeConfig } from 'blaze-slider';

type CarouselProps = {
  sm?: Partial<MediaConfig>;
  md?: Partial<MediaConfig>;
  config?: Partial<MediaConfig>;
  hideArrow?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Carousel = memo<CarouselProps>(function Carousel({
  hideArrow = false,
  children,
  config,
  md,
  sm,
  ...restProps
}) {
  const slider = useCarousel({
    all: {
      slidesToShow: 3,
      enableAutoplay: true,
      ...config,
    },
    '(max-width: 1023px)': {
      slidesToShow: 2,
      ...md,
    },
    '(max-width: 767px)': {
      slidesToShow: 1,
      ...sm,
    },
  });

  if (!children) return null;

  return (
    <div className="blaze-slider" ref={slider}>
      <div
        {...restProps}
        style={{ ...restProps.style, maxWidth: 'calc(100vw - 3rem)' }}
        className={'blaze-container mx-auto ' + restProps.className}>
        <button
          className={clsx(
            'blaze-prev cursor-pointer hidden',
            hideArrow ? 'md:hidden' : 'md:block'
          )}>
          <ArrowLeftCircleIcon className="text-white w-6 h-6" />
        </button>

        <div className="blaze-track-container">
          <div className="blaze-track">{children}</div>
        </div>

        <button
          className={clsx(
            'blaze-next cursor-pointer hidden',
            hideArrow ? 'md:hidden' : 'md:block'
          )}>
          <ArrowRightCircleIcon className="text-white w-6 h-6" />
        </button>
      </div>
      <div className="blaze-pagination space-x-6" />
    </div>
  );
});

export const useCarousel = (config: BlazeConfig) => {
  const elRef = useRef(null);
  const sliderRef = useRef<BlazeSlider>();

  useEffect(() => {
    if (!elRef.current) return;
    if (!sliderRef.current) {
      sliderRef.current = new BlazeSlider(elRef.current, config);
    }
  }, [config]);

  return elRef;
};

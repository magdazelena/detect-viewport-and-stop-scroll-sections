import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer'
import { useStyle as StyledSection } from './useStyle'

export default function Section(props) {
  const {
    children,
    id,
    onVisibilityChange,
    onScrollResume,
    manual
  } = props
  const [visible, setVisible] = useState(false) //previous state
  const [y, setY] = useState(null)
  const ref = useRef()
  const [inViewRef, inView] = useInView({
    threshold: [0.05, 0.9]
  })

  const setRefs = useCallback(
    (node) => {
      ref.current = node
      inViewRef(node)
    },
    [inViewRef],
  )

  const stopScroll = (position) => {
    setY(position)
  }
  const resumeScroll = () => {
    setY(null)
    onScrollResume()
  }

  async function scrollToPosition(container, position) {
    position = Math.round(position);

    if (container.scrollTop === position) {
      return;
    }

    let resolveFn;
    let scrollListener;
    let timeoutId;

    const promise = new Promise(resolve => {
      resolveFn = resolve;
    });

    const finished = () => {
      container.removeEventListener('scroll', scrollListener);
      resolveFn();
    };

    scrollListener = () => {
      clearTimeout(timeoutId);
      if (container.scrollTop === position) {
        finished();
      } else {
        timeoutId = setTimeout(finished, 100);
      }
    };

    container.addEventListener('scroll', scrollListener);

    container.scrollTo({
      top: position,
      behavior: 'smooth',
    });

    return promise;
  }
  const getTopPosition = () => {
    const node = ref.current
    if (!node) return null
    return node.getBoundingClientRect().top - document.body.getBoundingClientRect().top
  }
  const monitorScroll = () => {
    if (y === null) return
    window.scrollTo(0, y)
  }

  useEffect(() => {
    if (!manual) return
    window.addEventListener('scroll', monitorScroll, false)
    return () => {
      window.removeEventListener('scroll', monitorScroll, false)
    }
  }, [y])

  useEffect(() => {
    if (inView !== visible) {
      setVisible(inView)
      onVisibilityChange(inView, id)
      if (!inView || !manual) return
      if (getTopPosition()) {
        scrollToPosition(window, getTopPosition()).then(() => stopScroll(getTopPosition()))
      }
    }
  }, [inView])

  const renderChildren = () => {
    if (!React.isValidElement(children)) return <></>
    return Array.isArray(children)
      ? children.map((child, key) => (React.cloneElement(child, { key, resumeScroll })))
      : React.cloneElement(children, { resumeScroll })
  }
  return (
    <StyledSection ref={setRefs}>
      { !children
        ? <></>
        : renderChildren()
      }
    </StyledSection>
  );
}

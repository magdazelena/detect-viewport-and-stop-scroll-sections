import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer'
import { useStyle as StyledSection } from './useStyle'

export default function Section(props) {
  const {
    children,
    id,
    onVisibilityChange,
    manual
  } = props
  const [visible, setVisible] = useState(false) //previous state
  const [pos, setPos] = useState({ x: null, y: null })
  const ref = useRef()
  const [bounds, setBounds] = useState()
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

  const stopScroll = () => {
    setPos({ x: 0, y: getTopPosition() })
  }
  const resumeScroll = () => {
    if (ref.current && pos.y) window.scrollTo(0, pos.y + window.innerHeight)
    setPos({
      x: null,
      y: null
    })
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

      // scroll is finished when either the position has been reached, or 100ms have elapsed since the last scroll event
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
  const monitorScroll = useCallback(() => {
    if (pos.x === null && pos.y === null) return
    window.scrollTo(pos.x, pos.y)
  }, [pos.y])
  useEffect(() => {
    if (!manual) return
    monitorScroll()
  }, [manual, window.scrollY])
  useEffect(() => {
    if (inView !== visible) {
      setVisible(inView)
      onVisibilityChange(inView, id)
      if (!inView || !manual) return
      if (getTopPosition()) {
        scrollToPosition(window, getTopPosition()).then(stopScroll)
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

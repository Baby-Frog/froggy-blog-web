import {
  arrow,
  FloatingPortal,
  offset,
  Placement,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

type PopoverDismissProps = {
  children?: React.ReactNode;
  renderPopover?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  initialOpen?: boolean;
  referencePressEnable?: boolean;
  placement?: Placement;
  offsetPx?: number;
  sameWidthWithChildren?: boolean;
  enableArrow?: boolean;
  backgroundColor?: string;
};

const PopoverDismiss = ({
  children,
  renderPopover,
  className,
  offsetPx = 10,
  backgroundColor,
  enableArrow = true,
  sameWidthWithChildren = true,
  placement = "bottom-start",
  referencePressEnable = true,
  as: Element = "div",
}: PopoverDismissProps) => {
  const arrowRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    middleware: [
      offset(offsetPx),
      shift(),
      arrow({ element: arrowRef }),
      sameWidthWithChildren
        ? size({
            apply({ rects, elements }) {
              Object.assign(elements.floating.style, {
                width: `${rects.reference.width}px`,
              });
            },
          })
        : null,
    ],
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
  return (
    <Element
      className={className}
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        aria-hidden
      >
        {children}
      </div>
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              onClick={() => (referencePressEnable ? setIsOpen(!isOpen) : null)}
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: "max-content",
                transformOrigin: `${middlewareData.arrow?.x}px top`,
                zIndex: 4,
                backgroundColor: backgroundColor ?? "#fff",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              {...getFloatingProps()}
            >
              {enableArrow && (
                <span
                  className="absolute -translate-y-[98%] border-[11px] border-x-transparent border-t-transparent border-b-white"
                  ref={arrowRef}
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y,
                  }}
                ></span>
              )}
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
};

export default PopoverDismiss;

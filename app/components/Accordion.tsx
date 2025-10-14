import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
// Assuming cn is a utility function for conditional class joining
import { cn } from "~/lib/utils"; 

interface AccordionContextType {
  activeItems: string[];
  toggleItem: (id: string) => void;
  isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

interface AccordionProps {
  children: ReactNode;
  defaultOpen?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  defaultOpen,
  allowMultiple = false,
  className = "",
}) => {
  const [activeItems, setActiveItems] = useState<string[]>(
    defaultOpen ? [defaultOpen] : []
  );

  const toggleItem = (id: string) => {
    setActiveItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      } else {
        // Only one item can be open at a time (standard behavior)
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  const isItemActive = (id: string) => activeItems.includes(id);

  return (
    <AccordionContext.Provider
      value={{ activeItems, toggleItem, isItemActive }}
    >
      {/* Container: Dark background, rounded, with shadow */}
      <div className={`space-y-4 bg-gray-800 rounded-xl p-4 shadow-xl ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  children,
  className = "",
}) => {
  // Item container: No border needed here, the items naturally stack.
  return (
    <div className={`overflow-hidden rounded-lg transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
};

interface AccordionHeaderProps {
  itemId: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  itemId,
  children,
  className = "",
  icon,
  iconPosition = "right",
}) => {
  const { toggleItem, isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  // Default Arrow Icon (Modernized for dark theme)
  const defaultIcon = (
    <svg
      className={cn("w-5 h-5 transition-transform duration-200", {
        "rotate-180 text-indigo-400": isActive, // Active state color
        "text-gray-400": !isActive, // Inactive state color
      })}
      fill="none"
      stroke="currentColor" // Use currentColor so it changes with text color
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5} // Slightly thicker stroke
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const handleClick = () => {
    toggleItem(itemId);
  };

  // Modern Header Styling
  const headerClasses = cn(
    "w-full px-4 py-4 text-left font-semibold text-lg focus:outline-none transition-colors duration-200 flex items-center justify-between cursor-pointer rounded-lg",
    // Inactive state: Subtle hover effect
    "text-white hover:bg-gray-700",
    // Active state: Uses primary Indigo color for emphasis
    isActive ? "bg-gray-700 text-indigo-400" : "bg-gray-800",
    className
  );

  return (
    <button
      onClick={handleClick}
      className={headerClasses}
    >
      <div className="flex items-center space-x-4">
        {iconPosition === "left" && (icon || defaultIcon)}
        <div className="flex-1">{children}</div> {/* Children (Title) inherits text-white or text-indigo-400 */}
      </div>
      {iconPosition === "right" && (icon || defaultIcon)}
    </button>
  );
};

interface AccordionContentProps {
  itemId: string;
  children: ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  itemId,
  children,
  className = "",
}) => {
  const { isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-500 ease-in-out",
        isActive ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        className
      )}
    >
      {/* Content area: Slightly lighter background than the container for contrast */}
      <div className="px-4 py-4 text-gray-300 bg-gray-800 border-t border-gray-700">
        {children}
      </div>
    </div>
  );
};
import React from "react";

/**
 * Insertion des props à l'element passé en paramètres
 * @param {React.ComponentType} Component
 */
export const ElementView = <P extends object>(Component: React.ComponentType<P>) => {
    const WrappedComponent = (props: P) => <Component {...props} />;
    WrappedComponent.displayName = `elementView(${Component.displayName || Component.name || "Component"})`;
    return WrappedComponent;
};

export default ElementView;

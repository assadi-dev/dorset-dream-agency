import { Canvas, Point } from "fabric";
import { FabricObjectExtends } from "../../../../type";

/**
 * Positionne l'object à droite du canvas
 * @param canvas
 * @param object l'object sélectionné
 */
export const setRightPosition = (canvas: Canvas, object: FabricObjectExtends) => {
    const canvasWidth = canvas.getWidth();
    const right = canvasWidth - object.width * object.scaleX;
    object.setPositionByOrigin(new Point(right, object.top), object.originX, object.originY);
    object.setCoords();
};
/**
 * Positionne l'object à gauche du canvas
 * @param object l'object sélectionné
 */
export const setLeftPosition = (object: FabricObjectExtends) => {
    object.setPositionByOrigin(new Point(0, object.top), object.originX, object.originY);
    object.setCoords();
};

/**
 * Positionne l'object en tout en haut du canvas, 0 de l'axe Y
 * @param object
 */
export const setTopPosition = (object: FabricObjectExtends) => {
    object.setPositionByOrigin(new Point(object.left, 0), object.originX, object.originY);
    object.setCoords();
};

/**
 * Positionne l'object en tout en bas du canvas
 * @param object
 */
export const setBottomPosition = (canvas: Canvas, object: FabricObjectExtends) => {
    const canvasHeight = canvas.getHeight();
    const bottom = canvasHeight - object.height * object.scaleY;
    object.setPositionByOrigin(new Point(object.left, bottom), object.originX, object.originY);
    object.setCoords();
};
/**
 * Positionne l'object au centre du canvas sur  l'axe X
 * @param object
 */
export const setHorizontalCenterPosition = (canvas: Canvas, object: FabricObjectExtends) => {
    const canvasWidth = canvas.getWidth();
    const right = (object.width * object.scaleX) / 2;
    object.setPositionByOrigin(new Point(canvasWidth / 2 - right, object.top), object.originX, object.originY);
    object.setCoords();
};
/**
 * Positionne l'object au centre du canvas sur l'axe Y
 * @param object
 */
export const setVerticalCenterPosition = (canvas: Canvas, object: FabricObjectExtends) => {
    const canvasHeight = canvas.getHeight();
    const bottom = (object.height * object.scaleY) / 2;
    object.setPositionByOrigin(new Point(object.left, canvasHeight / 2 - bottom), object.originX, object.originY);
    object.setCoords();
};

export const setCenterPosition = (canvas: Canvas, object: FabricObjectExtends) => {
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const right = (object.width * object.scaleX) / 2;
    const bottom = (object.height * object.scaleY) / 2;
    object.setPositionByOrigin(
        new Point(canvasWidth / 2 - right, canvasHeight / 2 - bottom),
        object.originX,
        object.originY,
    );
    object.setCoords();
};

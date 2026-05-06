import {
  EDGE_HANDLE_MAX,
  EDGE_HANDLE_RATIO,
  EDGE_VERTICAL_HANDLE_RATIO,
  INTER_NODE_HANDLE_MAX,
  INTER_NODE_HANDLE_RATIO,
  INTER_NODE_VERTICAL_HANDLE_RATIO,
  OUTER_NODE_VERTICAL_HANDLE_RATIO,
} from "./constants";
import type { Point } from "./types";

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function buildSmoothPath(points: Point[]) {
  if (points.length < 2) {
    return "";
  }

  let path = `M ${round(points[0].x)} ${round(points[0].y)}`;
  const isInteriorNodePoint = (pointIndex: number) =>
    pointIndex > 1 && pointIndex < points.length - 2;
  const isOuterNodePoint = (pointIndex: number) =>
    pointIndex === 1 || pointIndex === points.length - 2;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previousPoint = points[index - 1] ?? points[index];
    const currentPoint = points[index];
    const nextPoint = points[index + 1];
    const followingPoint = points[index + 2] ?? nextPoint;
    const currentPointIsInteriorNode = isInteriorNodePoint(index);
    const currentPointIsOuterNode = isOuterNodePoint(index);
    const nextPointIsInteriorNode = isInteriorNodePoint(index + 1);
    const nextPointIsOuterNode = isOuterNodePoint(index + 1);
    const deltaX = nextPoint.x - currentPoint.x;
    const isEdgeSegment = index === 0 || index === points.length - 2;
    const horizontalDistance = Math.abs(deltaX);
    const directionX = Math.sign(deltaX) || 1;
    const horizontalHandle = clamp(
      horizontalDistance * (isEdgeSegment ? EDGE_HANDLE_RATIO : INTER_NODE_HANDLE_RATIO),
      0,
      isEdgeSegment ? EDGE_HANDLE_MAX : INTER_NODE_HANDLE_MAX,
    );
    const currentVerticalHandleRatio = isEdgeSegment
      ? EDGE_VERTICAL_HANDLE_RATIO
      : currentPointIsOuterNode
        ? OUTER_NODE_VERTICAL_HANDLE_RATIO
        : INTER_NODE_VERTICAL_HANDLE_RATIO;
    const nextVerticalHandleRatio = isEdgeSegment
      ? EDGE_VERTICAL_HANDLE_RATIO
      : nextPointIsOuterNode
        ? OUTER_NODE_VERTICAL_HANDLE_RATIO
        : INTER_NODE_VERTICAL_HANDLE_RATIO;
    const segmentVerticalDelta = nextPoint.y - currentPoint.y;
    // En los extremos evitamos heredar la inercia vertical del tramo vecino
    // para que la entrada y la salida hacia el borde se lean más rectas.
    const entryVerticalDelta = isEdgeSegment
      ? segmentVerticalDelta
      : nextPoint.y - previousPoint.y;
    const exitVerticalDelta = isEdgeSegment
      ? segmentVerticalDelta
      : followingPoint.y - currentPoint.y;

    const control1 = {
      x: currentPointIsInteriorNode
        ? currentPoint.x
        : currentPoint.x + directionX * horizontalHandle,
      y: currentPoint.y + entryVerticalDelta * currentVerticalHandleRatio,
    };
    const control2 = {
      x: nextPointIsInteriorNode
        ? nextPoint.x
        : nextPoint.x - directionX * horizontalHandle,
      y: nextPoint.y - exitVerticalDelta * nextVerticalHandleRatio,
    };

    path += ` C ${round(control1.x)} ${round(control1.y)}, ${round(control2.x)} ${round(control2.y)}, ${round(nextPoint.x)} ${round(nextPoint.y)}`;
  }

  return path;
}

export function measurePathLength(path: string) {
  const namespace = "http://www.w3.org/2000/svg";
  const pathElement = document.createElementNS(namespace, "path");
  pathElement.setAttribute("d", path);

  return pathElement.getTotalLength();
}

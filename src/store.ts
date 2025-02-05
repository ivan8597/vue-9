import { defineStore } from "pinia";
import { Point } from "./model/Point";

const generatePoints = (count: number): Point[] => {
  return Array.from({ length: count }, (_, index) => Point.create(index + 1));
};

export const usePointStore = defineStore("points", {
  state: () => ({
    points: generatePoints(10000),
    currentPoint: null as Point | null,
    selectedPoints: [] as number[],
  }),
  actions: {
    setCurrentPoint(point: Point) {
      this.currentPoint = point;
    },

    addPoint(name: string) {
      const newPoint = new Point(this.points.length + 1, name);
      this.points.push(newPoint);
      this.setCurrentPoint(newPoint); 
  

      console.log(`Added point:`, newPoint);
      console.log(`Current points array:`, this.points); 
  },
  
    updatePoint(point: Point) {
      const index = this.points.findIndex((p) => p.id === point.id);
      if (index !== -1) {
        this.points[index] = point;
      }
    },
    toggleSelected(pointId: number) {
      const index = this.selectedPoints.indexOf(pointId);
      if (index === -1) {
        this.selectedPoints.push(pointId);
        const selectedPoint = this.findPoint(pointId);
        if (selectedPoint) {
          this.setCurrentPoint(selectedPoint); 
        }
      } else {
        this.selectedPoints.splice(index, 1);
       
        if (this.currentPoint?.id === pointId) {
          this.currentPoint = null;
        }
      }
    },
    clearSelection() {
      this.selectedPoints = [];
      this.currentPoint = null; 
    },
    findPoint(id: number): Point | undefined {
      return this.points.find((point) => point.id === id);
    },
  },
});

"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";

import { CourseSearchBar } from "./components/CourseSearchBar";
import { Canvas } from "./components/Canvas";
import { ScheduleBoard, ScheduleData, SemesterId } from "./components/ScheduleBoard";
import { CourseCard } from "./components/CourseCard";

export default function CoursePlannerPage() {
  // State
  const [canvas, setCanvas] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<ScheduleData>({
    year1_fall: [],
    year1_spring: [],
    year2_fall: [],
    year2_spring: [],
    year3_fall: [],
    year3_spring: [],
    year4_fall: [],
    year4_spring: [],
  });
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  // DnD Sensors with activation constraints for better Mac support
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2, // Require 2px movement before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Get all existing courses
  const getAllCourses = (): string[] => {
    return [...canvas, ...Object.values(schedule).flat()];
  };

  // Add course to canvas
  const handleAddCourse = (courseCode: string) => {
    setCanvas((prev) => [...prev, courseCode]);
  };

  // Remove course from canvas
  const handleRemoveFromCanvas = (courseCode: string) => {
    setCanvas((prev) => prev.filter((code) => code !== courseCode));
  };

  // Remove course from semester (move back to canvas)
  const handleRemoveFromSemester = (semesterId: SemesterId, courseCode: string) => {
    setSchedule((prev) => ({
      ...prev,
      [semesterId]: prev[semesterId].filter((code) => code !== courseCode),
    }));
    setCanvas((prev) => [...prev, courseCode]);
  };

  // Find which container a course is in
  const findContainer = (courseCode: string): string | null => {
    if (canvas.includes(courseCode)) return "canvas";

    for (const [semesterId, courses] of Object.entries(schedule)) {
      if (courses.includes(courseCode)) return semesterId;
    }

    return null;
  };

  // Drag Start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveCourse(event.active.id as string);
  };

  // Drag End with Validation
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveCourse(null);
      return;
    }

    const courseCode = active.id as string;
    const sourceContainer = findContainer(courseCode);
    const overCourseCode = over.id as string;

    // over.id might be a container ID or a courseCode (another sortable item)
    // If it's a courseCode, find which container it belongs to
    let targetContainer = overCourseCode;
    const potentialContainer = findContainer(overCourseCode);
    if (potentialContainer) {
      // over.id is a courseCode, use its container
      targetContainer = potentialContainer;
    }

    // Handle reordering within the same container
    if (sourceContainer === targetContainer) {
      if (sourceContainer === "canvas") {
        setCanvas((prev) => {
          const oldIndex = prev.indexOf(courseCode);
          const newIndex = prev.indexOf(overCourseCode);
          return arrayMove(prev, oldIndex, newIndex);
        });
      } else if (sourceContainer && sourceContainer in schedule) {
        setSchedule((prev) => {
          const oldIndex = prev[sourceContainer as SemesterId].indexOf(courseCode);
          const newIndex = prev[sourceContainer as SemesterId].indexOf(overCourseCode);
          return {
            ...prev,
            [sourceContainer]: arrayMove(prev[sourceContainer as SemesterId], oldIndex, newIndex),
          };
        });
      }
      setActiveCourse(null);
      return;
    }

    // Validation: Check if target semester is full (max 5)
    if (targetContainer !== "canvas" && targetContainer in schedule) {
      const targetSemester = schedule[targetContainer as SemesterId];
      if (targetSemester.length >= 5) {
        alert(`${targetContainer} is full (max 5 courses)`);
        setActiveCourse(null);
        return;
      }
    }

    // Remove from source
    if (sourceContainer === "canvas") {
      setCanvas((prev) => prev.filter((code) => code !== courseCode));
    } else if (sourceContainer && sourceContainer in schedule) {
      setSchedule((prev) => ({
        ...prev,
        [sourceContainer]: prev[sourceContainer as SemesterId].filter(
          (code) => code !== courseCode
        ),
      }));
    }

    // Add to target
    if (targetContainer === "canvas") {
      setCanvas((prev) => [...prev, courseCode]);
    } else if (targetContainer in schedule) {
      setSchedule((prev) => ({
        ...prev,
        [targetContainer]: [...(prev[targetContainer as SemesterId] || []), courseCode],
      }));
    }

    setActiveCourse(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen .dark p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-primary mb-2">
              Course Planner
            </h1>
            <p className="text-gray-600 dark:text-primary-300">
              Plan your 4-year academic journey
            </p>
          </div>

          {/* Search Bar */}
          <CourseSearchBar
            onAddCourse={handleAddCourse}
            existingCourses={getAllCourses()}
          />

          {/* Canvas */}
          <Canvas courses={canvas} onRemoveCourse={handleRemoveFromCanvas} />

          {/* Schedule Board */}
          <ScheduleBoard
            schedule={schedule}
            onRemoveCourse={handleRemoveFromSemester}
          />
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeCourse ? (
          <CourseCard courseCode={activeCourse} isDragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

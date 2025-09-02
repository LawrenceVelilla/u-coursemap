'use client'

import { Button } from "@/components/ui/button"


interface SaveCourseProps {
    courseCode: string
}

export function SaveCourse({ courseCode }: SaveCourseProps) {
    function handleSaveClick() {
        alert(`Course ${courseCode} saved! (Functionality not implemented yet)`);
    }
    return (
        <Button onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-600 text-white">
            Save Course
        </Button>
    )
}
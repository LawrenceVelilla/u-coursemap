import React, { forwardRef, memo, type ReactNode, useEffect } from "react";

import { autoScrollWindowForElements } from "@atlaskit/pragmatic-drag-and-drop-autoscroll/element";

import { Box, xcss } from "@atlaskit/primitves";

import { useBoardContext } from "./board-context";
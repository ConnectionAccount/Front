"use client";

import React from "react";
import { Box, Paper } from "@mantine/core";
import { Plan } from "@/libs/scheduler/plan";

export default function PlanPage() {
  return (
    <Box p={24}>
      <Paper withBorder>
        <Plan />
      </Paper>
    </Box>
  );
}

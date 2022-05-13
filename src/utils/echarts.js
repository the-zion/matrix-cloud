import * as echarts from "echarts/core";
import {
    CalendarComponent,
    DatasetComponent, GraphicComponent,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    TransformComponent, VisualMapComponent
} from "echarts/components";
import {LabelLayout, UniversalTransition} from "echarts/features";
import {HeatmapChart} from "echarts/charts";
import {CanvasRenderer} from "echarts/renderers";

export function echartsInit() {
    echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        DatasetComponent,
        TransformComponent,
        LabelLayout,
        UniversalTransition,
        GraphicComponent,
        HeatmapChart,
        CalendarComponent,
        VisualMapComponent,
        CanvasRenderer,
    ])
    return echarts
}
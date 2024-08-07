import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "@styles/theme";

// Создаем стилизованный компонент FlexBox, наследуя базовый компонент Box
const FlexBoxStyled = styled(Box)(({ theme }) => ({
    display: "flex", // Применяем свойство display: flex для создания flex-контейнера
    flexDirection: "row", // Определяем направление элементов в контейнере (по умолчанию по горизонтали)
    alignItems: "center", // Центрируем элементы по вертикали
    justifyContent: "flex-start", // Выравниваем элементы в начале контейнера
    gap: theme.spacing(2), // Определяем пространство между элементами внутри контейнера
}));

// Типы пропсов для FlexBox
interface FlexBoxProps {
    children: React.ReactNode; // Принимаем любые React элементы как детей
    flexDirection?: "row" | "column"; // Добавляем возможность изменять направление элементов
    alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
    justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
    gap?: number | string; // Размер интервала между элементами
    bgColor?: string;
    sx?: object; // Пропс для кастомизации стилей
}

const FlexBox: React.FC<FlexBoxProps> = ({
    children,
    flexDirection = "row",
    alignItems = "center",
    justifyContent = "flex-start",
    gap,
    bgColor = theme.palette.background.paper,
    sx,
}) => {
    return (
        <FlexBoxStyled
            sx={{
                flexDirection,
                alignItems,
                justifyContent,
                gap,
                backgroundColor: bgColor,
                borderRadius: theme.shape.borderRadius,
                ...sx,
            }}
        >
            {children}
        </FlexBoxStyled>
    );
};

export default FlexBox;

import TextFieldControllerNew, {
  type DefaultFieldControllerProps,
} from "../../controllers/TextFieldControllerNew.tsx";

import CustomTextFieldLabel from "./CustomTextFieldLabel.tsx";
import CustomTextFieldWrapper from "./CustomTextFieldWrapper.tsx";
import type { StackProps } from "@mui/material/Stack";

interface Props {
  title?: string;
  textField: DefaultFieldControllerProps;
  wrapper?: StackProps;
}

/**
 * @description
 * ширина по умолчанию "кнопки" 54 + поле 35 = 89*
 * Кастомное текстовое поле с интеграцией react-hook-form.
 *
 * @param {Object} props - Свойства компонента
 * @param {string} [props.title] - Заголовок поля. Отображается над полем ввода
 * @param {DefaultFieldControllerProps} props.textField - Конфигурация текстового поля и react-hook-form контроллера
 * @param {Object} props.textField - Настройки поля
 * @param {FieldPath<FormType>} props.textField.fieldName - Путь к полю в структуре формы (обязательный)
 * @param {HTMLInputTypeAttribute} [props.textField.fieldType] - Тип HTML input элемента. По умолчанию "text"
 * @param {SxProps} [props.textField.sx] - Стили Material-UI для корневого элемента
 * @param {SxProps} [props.textField.sxSlotProps] - Стили для внутренних компонентов поля
 * @param {boolean} [props.textField.disabled] - Отключение поля ввода. По умолчанию false
 * @param {boolean} [props.textField.showChangeValueBtn] - Отображение кнопки изменения значения. По умолчанию false
 * @param {string|number} [props.textField.wrapperWidth] - Ширина обертки компонента (px или CSS строка)
 * @param {string} [props.textField.fontSize] - Размер шрифта в поле ввода. По умолчанию "16px"
 * @param {Object} [props.textField.multiline] - Настройки многострочного режима
 * @param {boolean} [props.textField.multiline.isMultiline] - Включить многострочный режим. По умолчанию false
 * @param {number} [props.textField.multiline.rows] - Количество отображаемых строк. По умолчанию 3
 * @param {StackProps} [props.wrapper] - Свойства обертки Stack компонента
 * @param {number} [props.wrapper.spacing] - Расстояние между элементами в Stack
 * @param {string} [props.wrapper.direction] - Направление элементов ("row" | "column")
 * @param {string} [props.wrapper.alignItems] - Выравнивание по поперечной оси
 * @param {string} [props.wrapper.justifyContent] - Выравнивание по главной оси
 * @param {SxProps} [props.wrapper.sx] - Стили Material-UI для Stack компонента
 *
 * @returns {JSX.Element} JSX элемент текстового поля
 *
 * @example
 * // Базовое использование
 * <CustomTextField
 *   textField={{
 *     fieldName: "email",
 *     fieldType: "email"
 *   }}
 * />
 *
 * @example
 * // Полная конфигурация
 * <CustomTextField
 *   title="Описание"
 *   textField={{
 *     fieldName: "description",
 *     fieldType: "text",
 *     disabled: false,
 *     showChangeValueBtn: true,
 *     wrapperWidth: "100%",
 *     fontSize: "14px",
 *     multiline: {
 *       isMultiline: true,
 *       rows: 4
 *     },
 *     sx: { marginBottom: 2 },
 *     sxSlotProps: { input: { color: "primary" } }
 *   }}
 *   wrapper={{
 *     spacing: 2,
 *     direction: "column",
 *     alignItems: "flex-start",
 *     sx: { padding: 2 }
 *   }}
 * />
 */

export default function CustomTextField({ title, textField, wrapper }: Props) {
  return (
    <CustomTextFieldWrapper stackProps={wrapper}>
      {title && <CustomTextFieldLabel title={title} />}
      <TextFieldControllerNew {...textField} />
    </CustomTextFieldWrapper>
  );
}

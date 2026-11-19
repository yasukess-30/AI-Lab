/**
 * Ícones determinísticos usados exclusivamente nos testes do pacote Quanta.
 *
 * O pacote privado @higgsfield-ai/icons é substituído em testes porque seus
 * SVGs são resolvidos pelo Vite como assets (data URLs) fora do pipeline SVGR.
 * Este adaptador mantém o contrato esperado pelo componente Icon: cada glyph
 * é um componente React que encaminha props diretamente ao elemento <svg>.
 *
 * A aplicação de produção continua usando app/src/lib/quanta-material-icons.ts.
 */
import type { ReactElement, SVGProps } from 'react'

type TestGlyph = (props: SVGProps<SVGSVGElement>) => ReactElement

function createGlyph(name: string): TestGlyph {
  return function TestGlyphComponent(props) {
    return (
      <svg viewBox="0 0 24 24" data-test-glyph={name} {...props}>
        <path d="M4 4h16v16H4z" />
      </svg>
    )
  }
}

export const IconMagnifyingGlass2Outlined = createGlyph('search')
export const IconMagnifyingGlassOutlined = createGlyph('search')
export const IconFolder1Outlined = createGlyph('folder')
export const IconCheckmark2MediumOutlined = createGlyph('check')
export const IconPlusMediumOutlined = createGlyph('add')
export const IconPinFilledThin = createGlyph('pin')
export const IconExclamationTriangleOutlined = createGlyph('warning')
export const IconCrossMediumOutlined = createGlyph('close')
export const IconCircleXOutlined = createGlyph('cancel')
export const IconCircleOutlined = createGlyph('circle')
export const IconCircleInfoOutlined = createGlyph('info')
export const IconCircleCheckOutlined = createGlyph('check-circle')
export const IconChevronRightMediumOutlined = createGlyph('chevron-right')
export const IconChevronLeftMediumOutlined = createGlyph('chevron-left')
export const IconChevronGrabberVerticalOutlined = createGlyph('unfold-more')
export const IconChevronDownMediumOutlined = createGlyph('chevron-down')
export const IconChevronBottomOutlined = createGlyph('chevron-down')

# PharmaB2B — UI System Documentation

## Visual Reference (Expected Layout)

```
┌─────────────────────┬─────────────────────────────────────────────┐
│    PHARMAB2B        │  Breadcrumb     Bell(3)  Cart(2)  [Avatar]│  ← 64px navbar
├─────────────────────┼─────────────────────────────────────────────┤
│                     │  Catálogo de Produtos            [+ Produto]│
│  [Logo]             ├─────────────────────────────────────────────┤
│                     │                                             │
│  ───────────        │  [Buscar produtos...             ]          │
│  ▣ Dashboard  ←hi   │                                             │
│  ★ Catálogo         │  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐    │
│  ▤ Produtos         │  │ Img   │ │ Img   │ │ Img   │ │ Img   │    │
│  ▾ Pedidos          │  │ Nome  │ │ Nome  │ │ Nome  │ │ Nome  │    │
│  ◉ Cotações         │  │ R$..  │ │ R$..  │ │ R$..  │ │ R$..  │    │
│                     │  │ [badge]│ │ [badge]│ │ [badge]│ │ [badge]│   │
│  ───────────        │  │ [Add] │ │ [Add] │ │ [Add] │ │ [Add] │    │
│  [Avatar]           │  └───────┘ └───────┘ └───────┘ └───────┘    │
│  user@pharmacy      │  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐    │
│  Farmácia           │  │ ...   │ │ ...   │ │ ...   │ │ ...   │    │
│                     │  └───────┘ └───────┘ └───────┘ └───────┘    │
│                     │                                             │
└─────────────────────┴─────────────────────────────────────────────┘
  260px fixed               Main scrollable content area
```

## Decisões de Design

### Layout
- **Sidebar fixa 260px** à esquerda, fundo `#0A2540` (brand institucional), links em branco com hover sutil
- **Navbar 64px** branca com sombra leve, contém breadcrumb + ações rápidas
- **Main content** com `margin-left: 260px`, `px-4 py-4`

### Cards
- `shadow-sm` + `border: none` — removido o border padrão do Bootstrap para visual mais limpo e moderno
- `border-radius: 0.75rem` — mais suave que o default Bootstrap (`0.375rem`)

### Formulários
- Altura fixa de **44px** em `.form-control` e `.form-select` (acessibilidade, área de toque)
- Usar `form-floating` sempre que possível — label como placeholder que sobe ao focar

### Tipografia
- **Inter** via Google Fonts — profissional, legível em telas pequenas
- Hierarquia: `h4 fw-bold` para título de página, `h6 fw-bold` para cabeçalhos de seção, `small text-muted` para subtítulos

### Tabelas
- `table-hover align-middle` sempre
- Headings com fundo `bg-light`, uppercase, `font-weight: 600`
- Necessário wrapper `table-responsive` para evitar overflow horizontal

### Modais
- Bootstrap Modal API (`new bootstrap.Modal(...)`) — sem `display: none` manual
- Modal de confirmação reutilizável via `<app-confirm-modal>`
- Modais com backdrop `rgba(0,0,0,.5)`

### Loading States
- Skeleton loaders com `placeholder-glow` (Bootstrap nativo) — preferível a spinner
- Spinners apenas como fallback para operações de ação (submit)

## Como Customizar a Paleta

Edite `src/styles/_variables.scss`:

```scss
$primary:   #0A2540;   // Botões primários, sidebar, destaques
$secondary: #2563EB;   // Links, ações secundárias
$success:   #059669;   // Status aprovado, métricas positivas
$warning:   #D97706;   // Status pendente, alertas
$danger:    #DC2626;   // Ações destrutivas, erros
$info:      #0284C7;   // Status informativo
$light:     #F8FAFC;   // Backgrounds claros
$dark:      #0F172A;   // Elementos escuros

$body-bg:         #F1F5F9;   // Background da aplicação
$body-color:      #1E293B;   // Cor do texto
```

Estas variáveis são passadas antes da import do Bootstrap SCSS, então sobrescrevem os valores padrão do framework. Após alterar, execute `ng serve` (auto-recarrega).

## Como Adicionar Novas Páginas

1. **Criar o componente** em `src/app/features/<feature>/<page>.component.ts`:

```typescript
@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <app-page-header title="Nova Página" subtitle="Descrição opcional" />
    <!-- conteúdo aqui -->
  `
})
export class NewPageComponent {}
```

2. **Adicionar rota** em `src/app/app.routes.ts`:

```typescript
{
  path: 'new-page',
  canActivate: [authGuard],
  loadComponent: () => import('./features/feature/new-page.component').then(m => m.NewPageComponent)
}
```

3. **Adicionar link na sidebar** em `src/app/shared/components/sidebar.component.ts` — adicione ao array `ALL_LINKS`:

```typescript
{ icon: 'bi-star', label: 'Nova Página', path: '/new-page', section: 'pharmacy' }
```

4. **Componentes úteis para reutilizar:**
   - `<app-stat-card>` para métricas
   - `<app-data-table>` para listagens tabulares
   - `<app-status-badge>` para status visual
   - `<app-empty-state>` para estados vazios
   - `<app-confirm-modal>` para confirmações
   - `<app-product-card>` para cards de produto

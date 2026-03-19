

## Make Accommodations Text Outline Thinner

**What**: Reduce the black text stroke and shadow on "Accommodations" so the gold color remains visible through the outline.

**How**: In `src/pages/Stays.tsx` line 146, change:
- `WebkitTextStroke` from `1px` to `0.5px`
- Reduce `textShadow` offsets from `0.5px` to `0.3px`

This will create a subtle black outline while keeping the gold fill color clearly visible.


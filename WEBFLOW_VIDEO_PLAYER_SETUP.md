# Webflow Video Player HTML Setup Guide

This guide shows you how to build the custom video player structure in Webflow Designer.

## HTML Structure

You need to wrap your existing `.project-video` element with the following structure:

```
div.video-player-wrapper
  └─ video.project-video (your existing video element with data-hls-src)
  └─ div.vp-paused-overlay
  └─ div.vp-center-icon
      └─ div.vp-play-pause-btn
          └─ div.vp-icon-play
          └─ div.vp-icon-pause
              └─ span
              └─ span
  └─ div.vp-player-ui
      └─ div.vp-ui-top
          └─ div.vp-time-details
              └─ span.vp-current-time (text: "0:00")
              └─ span.vp-time-separator (text: "/")
              └─ span.vp-total-time (text: "0:00")
          └─ div.vp-controls
              └─ div.vp-control-btn.vp-fullscreen-btn
                  └─ Embed: <svg>...</svg> (fullscreen icon)
              └─ div.vp-control-btn.vp-mute-btn
                  └─ Embed: <svg>...</svg> (volume icon)
      └─ div.vp-progress-bar
          └─ div.vp-progress-filled
```

## Step-by-Step in Webflow

### 1. Find Your Video Element
Locate your existing `video` element with class `.project-video`

### 2. Wrap Video in Container
1. Select the video element
2. Wrap it with a `div` and give it the class: `video-player-wrapper`

### 3. Add Paused Overlay
Inside `.video-player-wrapper`, add:
- `div` with class: `vp-paused-overlay`
- No content needed (it's a semi-transparent overlay)

### 4. Add Center Play/Pause Button
Inside `.video-player-wrapper`, add:
- `div` with class: `vp-center-icon`
  - Inside, add `div` with class: `vp-play-pause-btn`
    - Inside, add `div` with class: `vp-icon-play` (for play icon)
    - Inside, add `div` with class: `vp-icon-pause` (for pause icon)
      - Inside `vp-icon-pause`, add two `span` elements (these will be the pause bars)

### 5. Add Player UI Container
Inside `.video-player-wrapper`, add:
- `div` with class: `vp-player-ui`

### 6. Add UI Top Row
Inside `.vp-player-ui`, add:
- `div` with class: `vp-ui-top`

### 7. Add Time Details
Inside `.vp-ui-top`, add:
- `div` with class: `vp-time-details`
  - `span` with class: `vp-current-time` → Text: "0:00"
  - `span` with class: `vp-time-separator` → Text: "/"
  - `span` with class: `vp-total-time` → Text: "0:00"

### 8. Add Controls
Inside `.vp-ui-top` (after time details), add:
- `div` with class: `vp-controls`

### 9. Add Fullscreen Button
Inside `.vp-controls`, add:
- `div` with classes: `vp-control-btn vp-fullscreen-btn`
  - Inside, add an Embed element with this SVG:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white">
  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
</svg>
```

### 10. Add Mute Button
Inside `.vp-controls` (after fullscreen button), add:
- `div` with classes: `vp-control-btn vp-mute-btn`
  - Inside, add an Embed element with this SVG:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white">
  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
  <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
</svg>
```

### 11. Add Progress Bar
Inside `.vp-player-ui` (after `.vp-ui-top`), add:
- `div` with class: `vp-progress-bar`
  - Inside, add `div` with class: `vp-progress-filled`

## Important Notes

1. **Keep Your Existing Video Element**: Don't change your `.project-video` element - just wrap it
2. **NO CONTROLS ATTRIBUTE**: Make sure your video element does NOT have the `controls` attribute - remove it if it exists! We're building custom controls.
3. **Maintain data-hls-src Attribute**: Make sure your video still has the `data-hls-src` attribute with the HLS stream URL
4. **Class Names Must Match**: All class names must match exactly as shown above for the JavaScript to work
5. **SVG Icons**: You can customize the SVG icons later - these are just placeholders
6. **Responsive**: The CSS includes mobile breakpoints, but you can adjust in Webflow as needed

## Testing

After building this in Webflow:
1. Publish your changes
2. Test the video player:
   - Click video to play/pause
   - Click center button to play/pause
   - Click progress bar to seek
   - Hover to show controls
   - Controls should auto-hide after 3 seconds when playing
   - Test fullscreen and mute buttons

## Next Steps

Once you've built the HTML structure in Webflow:
1. Run `yarn build` to build your JavaScript
2. Upload the built `dist/main.js` to your CDN (Netlify)
3. Update the script reference in Webflow custom code
4. Publish and test!

If you need the mute/unmute icon variants, let me know and I can add those SVGs once you create them in Figma.

import { ContentType } from './types';

// The fixed reference tone block as per instructions.
export const REFERENCE_TONE_BLOCK = `Tone Block — Obsidian Gloss & Magenta Nebula Layout
🎨 Color Palette (Extracted)
Name	Hex	Appears In
Obsidian Gloss	#0E0E0E	Main outer shell of all soap shapes.
Rose Nebula Glitter	#E84AAF	Flakes sealed into the black soap surface.
Cosmic Plum	#8E2676	The dense, pliable inner clay-like core.
Pearl White	#F8F8F8	Nail polish with holographic shimmer.
Pastel Magenta	Gradient	The studio box background (fuchsia to violet-rose).
Holographic Dust	Multi	Micro-glitter dusting the background table.

🧩 Shape Breakdown
1. Soap Forms (6–8 pieces)
Count: 6 to 8 items total.
Shapes: A mix of:
Rectangular bars.
Orbiform pebbles (rounded stones).
Petal loops.
Tear-drop shells.
Arrangement: Diagonal and asymmetrical placement. Some shapes are cropped at the frame edges to create an organic, snapshot feel.
2. Background Surface
Texture & Color: Smooth gradient surface shifting from fuchsia to violet-rose.
Finish: Lightly dusted with holographic glitter that glows under the lights.
3. Hands
Characteristics: Young woman, neutral-fair skin tone.
Nails: Pearl-white polish with faint holographic shimmer.

✨ Material & Surface Texture
Outer Soap Shell:
Mirror-smooth enamel gloss.
Highly reflective (curved reflections).
Sealed with specific "Rose Nebula" glitter flakes.
Inner Core (Revealed on interaction):
Dense, pliable, clay-like material.
Deformation Physics: Soft, cohesive, and elastic. Stretches and folds without tearing.
Background:
Smooth studio paper texture with a "twinkling" glitter dust overlay.

💡 Lighting — Cinematic & Disciplined
Key Light: Overhead LED (5600K) creating crisp, white highlight bands on the curved glossy surfaces.
Side Fill: Low-angle magenta light from the left, adding a pink hue to the black reflections.
Back Glow: Rose-pink bounce lighting softly diffusing into the background gradient.
Reflections: Controlled and clean; one main specular streak per soap. No harsh hotspots.

🎞️ Composition & Layout
Camera Angle: Top-down with a 10° tilt for depth comfort.
Framing: Full tabletop visible; soaps occupy the majority of the frame.
Balance: Asymmetrical but harmonious (Cosmic Serenity).

🌊 Mood & Visual Emotion
Cosmic Serenity: A hypnotic blend of deep black gloss and pink glitter.
Fluid Luxury: The motion feels like molten glass or slow-moving galaxy swirls.
Tactile Elegance: A meditative rhythm of light, reflection, and soft elastic deformation.`;

export const DEFAULT_MASTER_PROMPTS: Record<ContentType, string> = {
  'Dust Core': `Scene Setup:
A highly realistic macro cinematic shot of a soap-crushing ASMR setup inside a soft pastel-toned mini studio box. The tabletop background is a dreamy gradient between peach, blush pink, and lavender, covered lightly in micro holographic glitter dust that glows and sparkles under studio lighting. The scene is calm, perfectly balanced, and psychologically relaxing to watch.
The frame composition shows 6–8 pastel soaps arranged geometrically — slightly asymmetrical but visually harmonious. Some soaps are cropped at the frame edges for a natural, organic feel. The colors of the soaps match the pastel palette (cotton-candy pink, butter yellow, baby blue, lilac, mint, and cream) with a soft metallic-aluminum-like sheen — shiny, smooth, and luxuriously glossy without looking artificial.

Soap Design & Material
{{TONE_BLOCK}}

Hand & Nail Design

Hands: belong to a young woman with soft, glowing, naturally fair skin — delicate, feminine, and aesthetic (Korean/Russian-style skin tone).
Nails: glossy glitter polish with holographic reflection; tone matches the studio background or complements soap palette (pastel pink, lilac, or silver shimmer).

Movement:

The girl picks up one soap at a time gently, holds it centered in frame.
She crushes it completely with firm pressure, not too slow or too fast — satisfying, rhythmic pace.
Crushed powder softly bursts outward, settling gently onto the glittery surface.
In total, 2 soaps are crushed within 8 seconds, each crush perfectly timed to sound and visual cues.

 Camera Setup

Camera position: top-down view with a 10° relaxing tilt toward the soaps — optimal for human eye comfort and ASMR psychological relaxation.

Framing: full tabletop visible, soaps filling most of frame; hands enter smoothly from bottom edge.
Lens: 50mm macro, aperture f/2.8 for shallow depth of field — focus remains on the soap’s surface texture and glitter reflection.

Focus: dynamic micro-focus shift between soap surface and powder particles after each crush.

Stabilization: perfectly static — no camera shake.

Resolution: 8K UHD at 120 FPS.
Render quality: physically accurate global illumination, real-time subsurface scattering, and soft material reflections.

Lighting Design

Main Light: soft diffused overhead panel (5500K daylight white) evenly illuminating the setup.

Fill Light: low-intensity side light from left adds gradient and enhances glitter shimmer.

Backlight: faint pastel glow adds dreamy halo effect behind the soaps.

Reflections: gentle highlights on glossy surfaces — never harsh or blown out.

Shadow style: minimal, soft, low-contrast — visual comfort prioritized.

Bloom effect: subtle light bloom on glitter and pastel highlights for dreamlike softness.

🔊 ASMR Sound Design

Audio focus: only the soap-crushing sounds — no background or environmental noise.

Sound components per crush:

Initial crack — crisp, clean snap as the outer layer breaks.

Crumble layer — fine grain sound as soap fragments collapse.

Dust release — soft air-sweeping whisper of powder dispersing.

Timing: each sound sequence begins precisely when the soap starts breaking and ends as the powder settles.

Mixing: stereo field captures proximity and tactile realism; no lingering echo.

Volume: low to medium, satisfying and gentle — pure ASMR texture.

⚙️ Technical Enhancements

Resolution: 8K UHD, 120 FPS

Codec: ProRes / HQ

Color Space: DCI-P3

Light physics: ray-traced subsurface scattering for soap transparency realism

Material physics: fine dust particle simulation with soft gravity falloff

Post effects: slight bloom, pastel hue compression, gentle depth blur

Camera exposure: auto-balanced for skin tone and pastel highlights

Tags:
--ultra_realistic --macro_focus --pastel_glitter --dreamy_soft_light --soap_dust_physics --relaxing_angle --macro_depth --prism_reflection --gloss_surface --asymmetric_balance --crisp_ASMR_audio --powder_particle_simulation --no_camera_shake --holographic_glitter --cinematic_8K_look --satisfying_visuals

Visual Emotion / Mood

The overall mood is calm, satisfying, and visually hypnotic — gentle yet engaging.
Each crush moment is visually rewarding with colorful powder bursts and delicate hand motion.
The pastel palette evokes softness and comfort; glitter reflects micro light creating a celestial “soap galaxy” look.`,

  'Clay Core': `Scene Setup
A highly realistic macro cinematic shot of a soap-crushing ASMR setup inside a pastel-teal-toned mini studio box. The tabletop background is a smooth teal canvas (#20594E) with a matte finish, sprinkled with gold and lime glitter flakes that shimmer under soft diffused light. The overall atmosphere feels fresh, calm, and satisfyingly tactile — combining handcrafted artistry with soothing visual rhythm.
The frame composition displays 6–8 sculpted pistachio-tone soaps, arranged geometrically but slightly asymmetrical for a natural organic feel. Each soap shape corresponds exactly to the Tone Block design.

Soap Design & Material
{{TONE_BLOCK}}

Hand & Nail Design
Hands: belong to a young woman with smooth, naturally fair Korean-style skin tone — soft lighting enhances the glow.
Nails: glossy holographic glitter polish matching the pistachio palette (butter-yellow or soft gold shimmer).
Motion feel: delicate but confident, visually rhythmic and tactilely precise.

Movement
Continue this exact scene from the last frame of the previous video, Start exactly where the previous video ended 
The girl picks up one soap at a time, centering it in the frame.
She begins pressing and folding it with soft rhythmic motion — like kneading colorful clay
The soap deforms slowly at first, then folds into itself, showing creamy internal clay texture and glitter transfer.
She continues manipulating it until it’s fully flattened or reshaped — no breakage, just soft deformation.
After one soap is completed, the scene cuts cleanly to her hands picking up the next piece.
She never places the deformed soap back on the table — instead, the transition maintains identical scene composition with remaining pieces in place.
Each soap sequence lasts around 8 seconds, matching the rhythmic tactile feel of slow-motion clay play.


Camera Setup

Position: top-down with a 10° tilt for visual comfort and ASMR relaxation.


Framing: full tabletop visible, soaps fill most of frame; hands enter smoothly from the bottom.


Lens: 50mm macro at f/2.8 for shallow depth of field and creamy bokeh.


Focus: micro dynamic shift between soap surface and stretching clay folds.


Stabilization: static tripod, no shake.


Resolution: 8K UHD at 120 FPS.


Render Quality: physically accurate global illumination, real-time subsurface scattering, soft shadow blending.


Lighting Design

Main Light: soft diffused overhead (5500K daylight) evenly brightens setup.


Fill Light: low-intensity left-side light enhances glitter shimmer on curved petals and coils.


Backlight: faint pastel-yellow halo glow enhances warmth and shape depth.


Reflections: soft metallic sheen; no blown highlights.


Shadow Style: minimal, shallow, and warm-edged.


Bloom Effect: gentle golden bloom over glitter edges and folded clay highlights — dreamlike, creamy glow.


🔊 ASMR Sound Design (Visual Focus)
Audio imagined as:

Press Phase: soft, cushioned resistance sound — like hands pressing clay.


Stretch Phase: smooth sticky pull, faint friction of elastic material.


Fold Phase: subtle air compression, low mid-tonal warmth.
Each sound sequence blends naturally — no harsh peaks, maintaining a hypnotic rhythm.
Volume: medium-low, tactile, soothing.


⚙️ Technical Enhancements

Resolution: 8K UHD 120 FPS


Codec: ProRes / HQ


Color Space: DCI-P3


Light Physics: ray-traced subsurface scattering for soap translucency realism


Material Physics: soft cohesive clay deformation (preserving volume, maintaining elasticity)


Post Effects: soft pastel hue compression, slight golden bloom, gentle depth blur


Camera Exposure: balanced for natural skin tone and yellow-green clay brightness


Tags
--ultra_realistic --macro_focus --pastel_glitter --dreamy_soft_light --soap_clay_physics --relaxing_angle --macro_depth --prism_reflection --gloss_surface --asymmetric_balance --soft_motion --macro_elastic_deform --holographic_glitter --cinematic_8K_look --satisfying_visuals

Visual Emotion / Mood
The overall mood is warm, tactile, and visually indulgent — soft handcrafted luxury meets calming rhythm.
The Golden Pistachio palette evokes freshness, nature, and buttery warmth.
Each fold, press, and stretch feels wholesome and hypnotic, like sculpting creamy, glowing clay in sunlight.
The visual harmony of yellow and green tones reflects both serenity and creativity — endlessly loopable and deeply satisfying to watch.`,

  'Starch Core': `Scene Setup: A highly realistic macro cinematic shot of a soap-crushing ASMR setup inside a clean, modern studio environment. The tabletop background is a solid, matte Soft Box Cream (#FFFADC) surface—smooth, flat, and non-reflective, providing a high-contrast, professional backdrop. The scene is calm, perfectly balanced, and psychologically satisfying due to the pop-art color contrast. The frame composition shows many soaps arranged geometrically—slightly asymmetrical but visually harmonious. Some soaps are cropped at the frame edges. The soaps have a uniform satin finish and are decorated with intricate patterns of Lustrous White Pearl beads (#F0F0F2).
Soap Design & Material
{{TONE_BLOCK}}

Hand & Nail Design

Hands: belong to a young woman with soft, glowing, naturally fair skin — delicate, feminine, and aesthetic (Korean/Russian-style skin tone).


Nails: Lustrous White Pearl or Pearly Nude polish to perfectly match the bead accents on the soaps; glossy and reflective.

Movement (UPDATED WITH YOUR ACTION LOGIC)

Continue this exact scene from the last frame of the previous video, Start exactly where the previous video ended , The girl picks up the first Electric Lime Green soap gently, holding it centered in frame.


Smooth Transition: Instead of lifting it directly from the table in real time, there is a smooth transition / soft fade effect: her hand reappears already holding one of the soaps that was previously on the table, and that exact soap now disappears from the table layout, ensuring no duplicates.


She crushes it completely with firm pressure, not too slow or too fast — satisfying, rhythmic pace.


Crushed starch and loose pearls softly burst outward, settling gently onto the cream surface.


This transition repeats subtly for each crush: each time she crushes a soap, the soap she holds must be one that was present on the table before.


In total, 2 soaps are crushed within 8 seconds.

Camera Setup

Camera position: top-down view with a 10° relaxing tilt toward the soaps.


Framing: full tabletop visible, soaps filling most of frame against the cream background; hands enter smoothly from bottom edge.


Lens: 50mm macro, aperture f/2.8 for shallow depth of field — focus remains on the soap’s satin texture and the glossy reflection of the pearl beads.


Focus: dynamic micro-focus shift between soap surface and starch particles after each crush.


Stabilization: perfectly static — no camera shake.


Resolution: 8K UHD at 120 FPS.


Render quality: physically accurate global illumination, real-time subsurface scattering, and soft material reflections.

Lighting Design

Main Light: soft diffused overhead panel (5500K daylight white) evenly illuminating the setup.


Highlights: The White Pearl beads catch the light, creating sharp, bright specular highlights (#FFFFFF).


Shadows: The lime green soaps cast soft, warm-toned shadows (#E6E1C8) onto the cream table, grounding the objects.


Contrast: High contrast between the vivid green objects and the pale background.

🎧 ASMR Sound Design (Starch-Core Edition)

Audio focus: only the soap-crushing sounds — no background or environmental noise.


Sound components per crush:


Initial Crack: A crisp, clean snap as the hard shell and beads break.


Starch Compression: A dense, soft, cushioned sound: “phff… chhfff…”


Starch Puff Release: A muffled cloud release: “whoofh”


Particle Falloff: A silky settling noise mixed with the faint click of loose pearls hitting the table: “fshhhh… tick…”


Timing: each sequence begins exactly when the shell breaks and ends as the starch/beads settle.


Mixing: stereo field captures proximity and tactile realism.

Technical Enhancements

Resolution: 8K UHD, 120 FPS


Codec: ProRes / HQ


Color Space: DCI-P3


Light physics: ray-traced reflections on pearl beads.


Material physics: fine starch particle simulation with soft gravity falloff.


Post effects: slight bloom on pearl highlights, vibrant color preservation.

Tags:
--ultra_realistic --macro_focus --electric_lime_green --soft_box_cream_background --pearl_bead_texture --starch_puff_physics --relaxing_angle --macro_depth --satin_finish --pop_art_contrast --crisp_ASMR_audio --starch_particle_settling --no_camera_shake --clean_studio_look --cinematic_8K_look --satisfying_visuals
Visual Emotion / Mood

Clean & Fresh: The cream background makes the scene feel cleaner and professional.


Pop Art Contrast: The intense Electric Lime Green soaps stand out vividly against the neutral background.
Tactile & Playful: The glossy pearls on satin soap are the central tactile focus, appealing to the sense of touch.`,

  'Cutting Soap': `Scene Setup: A highly realistic macro cinematic shot of a soap-cutting ASMR setup inside a soft pastel-toned mini studio box. The tabletop background is a dreamy gradient between peach, blush pink, and lavender, covered lightly in micro holographic glitter dust that glows and sparkles under studio lighting. The scene is calm, perfectly balanced, and psychologically relaxing to watch. The frame composition shows many soaps arranged geometrically — slightly asymmetrical but visually harmonious. Some soaps are cropped at the frame edges for a natural, organic feel. The colors of the soaps match the pastel palette (cotton-candy pink, butter yellow, baby blue, lilac, mint, and cream) with a soft metallic-aluminum-like sheen — shiny, smooth, and luxuriously glossy without looking artificial. 
Soap Design & Material
{{TONE_BLOCK}}

Hand, Nail & Tool Design Hands: belong to a young woman with soft, glowing, naturally fair skin — delicate, feminine, and aesthetic (Korean/Russian-style skin tone). Nails: glossy glitter polish with holographic reflection; tone matches the studio background or complements soap palette (pastel pink, lilac, or silver shimmer). Tool: The right hand holds a professional craft cutter or retractable knife with a clean, razor-sharp silver blade. Movement (UPDATED WITH CUTTING LOGIC) Continue this exact scene from the last frame of the previous video, Start exactly where the previous video ended, she holds a different soap everytime She grabs the purple soap and start cutting it Instead of lifting it directly from the table in real time, there is a smooth transition / soft fade effect: her hand reappears already holding one of the soaps that was previously on the table, and that exact soap now disappears from the table layout, ensuring no duplicates. The right hand enters simultaneously holding the cutter. The Shave: She presses the blade edge gently against the top of the grid. She pushes the blade forward in a steady, rhythmic motion, shaving off a paper-thin layer of the soap columns. The Flow: As the blade moves, a continuous stream of tiny pink micro-chunks erupts from the edge, tumbling over the knife and falling rapidly onto the table. Repetition: She performs rapid, shallow cuts—one after another—shaving the grid down layer by micro-layer. Transition Out: After approximately 8 seconds of cutting, the slicing action stops. The hands smoothly move out of frame or fade, indicating a transition to the next soap. Camera Setup Camera position: top-down view with a 10° relaxing tilt toward the soaps — optimal for human eye comfort and ASMR psychological relaxation. Framing: full tabletop visible, soaps filling most of frame; hands enter smoothly from bottom edge. Lens: 50mm macro, aperture f/2.8 for shallow depth of field — focus remains on the blade edge exactly where the solid soap turns into crumbles. Focus: dynamic micro-focus tracking the knife blade and the falling micro-chunks. Stabilization: perfectly static — no camera shake. Resolution: 8K UHD at 120 FPS. Render quality: physically accurate global illumination, real-time subsurface scattering, and soft material reflections. Lighting Design Main Light: soft diffused overhead panel (5500K daylight white) evenly illuminating the setup. Fill Light: low-intensity side light from left adds gradient and enhances glitter shimmer. Backlight: faint pastel glow adds dreamy halo effect behind the soaps. Reflections: gentle highlights on glossy surfaces — never harsh or blown out. Subtly highlights the sharp metallic edge of the knife. Shadow style: minimal, soft, low-contrast — visual comfort prioritized. Bloom effect: subtle light bloom on glitter and pastel highlights for dreamlike softness. 🎧 ASMR Sound Design (Micro-Shaving Edition) Audio focus: only the cutting and falling sounds — no background or environmental noise. Sound components per slice: The Shave: A continuous, dry, textured raspy sound (like sandpaper on wood or dry carving) as the blade scrapes the hard soap. The Fracture: High-frequency crackling/snapping as the tiny grid columns break off. The Rain: A constant, soft pitter-patter-shhh sound as thousands of tiny micro-chunks and powder land on the chip-covered surface below. Timing: each sequence begins exactly when the blade engages the grid and ends as the debris settles. Mixing: stereo field captures proximity and tactile realism; no lingering echo. Volume: low to medium, satisfying and gentle — pure, dry texture-based ASMR. Technical Enhancements Resolution: 8K UHD, 120 FPS Codec: ProRes / HQ Color Space: DCI-P3 Light physics: ray-traced subsurface scattering for soap transparency realism. Material physics: accurate rigid-body physics for tiny, uneven soap chunks falling and colliding; real-time powder generation based on friction. Post effects: slight bloom, pastel hue compression, gentle depth blur. Camera exposure: auto-balanced for skin tone and pastel highlights. Tags: --ultra_realistic --macro_focus --soap_shaving --hard_soap_asmr --grid_pattern --micro_chunks --powder_rain --shallow_cut --satisfying_texture --crisp_audio --cinematic_8K_look --hand_transition --no_camera_shake --dry_crumble_physics --pastel_glitter --dreamy_soft_light Visual Emotion / Mood The overall mood is calm, satisfying, and visually hypnotic — gentle yet engaging. Each cutting moment is visually rewarding with the cascading shower of tiny chips and delicate hand motion. The pastel palette evokes softness and comfort; glitter reflects micro light creating a celestial “soap galaxy” look.`,
};

export const CONTENT_TYPES: ContentType[] = [
  'Dust Core',
  'Clay Core',
  'Starch Core',
  'Cutting Soap'
];
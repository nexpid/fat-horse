/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import horse from "file://horse.js";

const settings = definePluginSettings({
    speed: {
        description: "Speed of the horse",
        type: OptionType.NUMBER,
        default: 30,
        isValid: (v: number) => v > 0 || "Speed must be larger than 0",
        onChange: load
    },
    fps: {
        description: "Framerate of the horse",
        type: OptionType.NUMBER,
        default: 24,
        isValid: (v: number) => v > 0 || "Framerate must be larger than 0",
        onChange: load
    },
    size: {
        description: "Size of the horse",
        type: OptionType.NUMBER,
        default: 120,
        isValid: (v: number) => v > 0 || "Size must be larger than 0",
        onChange: load
    },
    fade: {
        description: "Whether the horse fades when the cursor is near",
        type: OptionType.BOOLEAN,
        default: true,
        onChange: load
    },
    shake: {
        description: "Whether the horse should shake the window while walking",
        type: OptionType.BOOLEAN,
        default: false,
        onChange: load
    }
});

function load() {
    if (!Vencord.Plugins.isPluginEnabled("FatassHorse")) return;

    (0, eval)(horse)({
        speed: settings.store.speed,
        fps: settings.store.fps,
        size: settings.store.size,
        fade: settings.store.fade,
        shake: settings.store.shake
    });
}

export default definePlugin({
    name: "FatassHorse",
    description: "What a fatass",
    authors: [{
        name: "Nexpid",
        id: 853550207039832084n
    }],
    settings,

    start: load,
    stop() {
        document.getElementById("fathorse")?.remove();
    }
});

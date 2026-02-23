<script lang="ts">
  import { onMount } from "svelte";

  // State Management
  let activeSection = "collections"; // collections, points, search, snapshots, system
  let selectedCollection = "cities";
  let isCreatingCollection = false;

  // Mock Data
  const sections = [
    {
      id: "collections",
      label: "Collections",
      icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    },
    {
      id: "points",
      label: "Point Manager",
      icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    },
    {
      id: "search",
      label: "Vector Search",
      icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    },
    {
      id: "snapshots",
      label: "Snapshots",
      icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
    },
    { id: "system", label: "System Health", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
  ];

  let collections = [
    {
      name: "cities",
      vectors: { size: 4, distance: "Cosine" },
      status: "green",
      points: 3,
    },
    {
      name: "embeddings_v1",
      vectors: { size: 1536, distance: "Cosine" },
      status: "green",
      points: 154,
    },
  ];

  let points = [
    {
      id: 1,
      vector: [0.1, 0.2, 0.3, 0.4],
      payload: { city: "Berlin", population: 3700000 },
    },
    {
      id: 2,
      vector: [0.5, 0.1, 0.2, 0.8],
      payload: { city: "London", population: 8900000 },
    },
    {
      id: 3,
      vector: [0.9, 0.3, 0.1, 0.2],
      payload: { city: "Paris", population: 2100000 },
    },
  ];

  function setActive(id: string) {
    activeSection = id;
  }
</script>

<div
  class="min-h-screen bg-[#0a0a0b] text-neutral-100 font-sans selection:bg-blue-500/30 flex overflow-hidden"
>
  <!-- Navigation Rail -->
  <nav
    class="w-72 bg-[#0f0f12] border-r border-neutral-800/50 flex flex-col z-20"
  >
    <div class="p-8 border-b border-neutral-800/50 flex items-center gap-4">
      <div
        class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
          /></svg
        >
      </div>
      <div>
        <h1 class="font-bold text-lg leading-tight">Qdrant</h1>
        <p
          class="text-[10px] text-neutral-500 font-bold uppercase tracking-widest leading-none"
        >
          Playground
        </p>
      </div>
    </div>

    <div class="flex-1 p-4 space-y-1.5 overflow-y-auto mt-4">
      <div class="px-4 mb-4">
        <span
          class="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em]"
          >Core Functions</span
        >
      </div>
      {#each sections as section}
        <button
          on:click={() => setActive(section.id)}
          class="w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-300 flex items-center gap-4 group {activeSection ===
          section.id
            ? 'bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/40 shadow-xl shadow-blue-500/5'
            : 'hover:bg-neutral-800/40 text-neutral-500 hover:text-neutral-300'}"
        >
          <svg
            class="transition-transform duration-300 group-hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d={section.icon} />
          </svg>
          <span class="font-semibold text-sm">{section.label}</span>
          {#if activeSection === section.id}
            <div
              class="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            ></div>
          {/if}
        </button>
      {/each}
    </div>

    <div class="p-6 border-t border-neutral-800/50">
      <div
        class="flex items-center gap-4 p-4 bg-neutral-900/40 border border-neutral-800/50 rounded-2xl"
      >
        <div class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
        <div class="flex flex-col">
          <span class="text-[10px] text-neutral-500 font-bold uppercase"
            >Instance Status</span
          >
          <span class="text-xs font-mono text-emerald-400">localhost:6333</span>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main View Area -->
  <main class="flex-1 flex flex-col min-w-0 bg-[#0a0a0b] relative">
    <!-- Hero Header Component -->
    <header
      class="h-24 px-12 border-b border-neutral-800/50 flex items-center justify-between bg-[#0a0a0b]/80 backdrop-blur-xl z-10 sticky top-0"
    >
      <div class="flex flex-col">
        <h2 class="text-2xl font-bold tracking-tight text-white mb-1">
          {sections.find((s) => s.id === activeSection)?.label}
        </h2>
        <p class="text-xs text-neutral-500 font-medium">
          Testing basic functionality and vector workflows
        </p>
      </div>

      <div class="flex items-center gap-4">
        <button
          class="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-bold transition-all flex items-center gap-2 group"
        >
          <svg
            class="group-hover:rotate-180 transition-transform duration-500"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path
              d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
            /><path d="M21 3v5h-5" /><path
              d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
            /><path d="M3 21v-5h5" /></svg
          >
          Reload State
        </button>
        <button
          class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/50 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          New Operation
        </button>
      </div>
    </header>

    <!-- Content Scroller -->
    <div class="flex-1 overflow-y-auto p-12 scroll-smooth">
      {#if activeSection === "collections"}
        <div class="space-y-12">
          <!-- Stat Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {#each [{ l: "Total Collections", v: "12" }, { l: "Stored Vectors", v: "2.4M", c: "text-blue-400" }, { l: "Avg. Latency", v: "14ms", c: "text-emerald-400" }] as stat}
              <div
                class="p-8 bg-neutral-900/30 border border-neutral-800/50 rounded-[32px] group hover:border-blue-500/30 transition-colors relative overflow-hidden"
              >
                <div class="relative z-10">
                  <p
                    class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2"
                  >
                    {stat.l}
                  </p>
                  <h4 class="text-3xl font-black {stat.c || 'text-white'}">
                    {stat.v}
                  </h4>
                </div>
                <div
                  class="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-colors"
                ></div>
              </div>
            {/each}
          </div>

          <!-- Collections List -->
          <div class="space-y-6">
            <div class="flex items-center justify-between px-4">
              <h3
                class="text-sm font-bold text-neutral-400 uppercase tracking-widest"
              >
                Active Collections
              </h3>
              <button
                on:click={() => (isCreatingCollection = true)}
                class="text-xs font-bold text-blue-500 hover:underline"
                >Create New +</button
              >
            </div>
            <div class="grid gap-4">
              {#each collections as col}
                <div
                  class="p-6 bg-neutral-900/20 border border-neutral-800/50 rounded-3xl flex items-center justify-between hover:bg-neutral-900/40 transition-colors group"
                >
                  <div class="flex items-center gap-8">
                    <div
                      class="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-xl font-black text-indigo-400 shadow-inner group-hover:scale-105 transition-transform"
                    >
                      {col.name[0].toUpperCase()}
                    </div>
                    <div>
                      <h5 class="text-lg font-bold text-white mb-1">
                        {col.name}
                      </h5>
                      <div class="flex gap-4">
                        <span
                          class="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700"
                          >{col.vectors.size}D • {col.vectors.distance}</span
                        >
                        <span
                          class="text-[10px] font-bold text-blue-500 uppercase tracking-tighter bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20"
                          >{col.points} Points</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button
                      aria-label="Edit collection"
                      class="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path d="M12 20h9" /><path
                          d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                        /></svg
                      >
                    </button>
                    <button
                      aria-label="Delete collection"
                      class="p-3 bg-red-500/5 border border-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors text-red-500/50 hover:text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path d="M3 6h18" /><path
                          d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
                        /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line
                          x1="10"
                          x2="10"
                          y1="11"
                          y2="17"
                        /><line x1="14" x2="14" y1="11" y2="17" /></svg
                      >
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}

      {#if activeSection === "points"}
        <div class="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <!-- Action Banner -->
          <div
            class="p-10 bg-gradient-to-br from-indigo-900/20 to-blue-900/10 border border-indigo-500/20 rounded-[40px] flex items-center justify-between"
          >
            <div class="space-y-2">
              <h3 class="text-xl font-bold">Point Operations</h3>
              <p class="text-sm text-neutral-400">
                Upsert, retrieve, or delete specific points by ID
              </p>
            </div>
            <div class="flex gap-4">
              <button
                class="px-8 py-4 bg-white text-black font-bold rounded-2xl shadow-xl shadow-white/5 active:scale-95 transition-all"
                >Batch Upsert</button
              >
              <button
                class="px-8 py-4 bg-neutral-900 border border-neutral-800 font-bold rounded-2xl hover:bg-neutral-800 transition-all text-sm"
                >Advanced Filter</button
              >
            </div>
          </div>

          <!-- Points Table -->
          <div
            class="overflow-hidden border border-neutral-800/50 rounded-[32px] bg-[#0f0f12]/50"
          >
            <div
              class="p-6 border-b border-neutral-800/50 bg-[#0f0f12]/80 flex items-center justify-between"
            >
              <div class="flex items-center gap-4">
                <select
                  class="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-xs font-bold text-neutral-400 outline-none"
                >
                  <option>Selection: cities</option>
                  <option>Selection: embeddings_v1</option>
                </select>
                <span class="text-[10px] font-bold text-neutral-600 uppercase"
                  >3 Points Found</span
                >
              </div>
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Search ID..."
                  class="bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-2 text-xs outline-none focus:border-blue-500/50 transition-colors w-40"
                />
              </div>
            </div>
            <table class="w-full text-left">
              <thead>
                <tr
                  class="bg-neutral-900/40 text-neutral-500 text-[10px] font-black uppercase tracking-widest"
                >
                  <th class="px-8 py-5">ID</th>
                  <th class="px-8 py-5">Vector Visualization</th>
                  <th class="px-8 py-5">Payload Meta</th>
                  <th class="px-8 py-5 text-right pr-12">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-800/50">
                {#each points as pt}
                  <tr class="hover:bg-blue-500/[0.02] transition-colors group">
                    <td
                      class="px-8 py-6 font-mono text-xs text-blue-400 font-bold"
                      >#{pt.id}</td
                    >
                    <td class="px-8 py-6">
                      <div class="flex gap-1.5 overflow-hidden">
                        {#each pt.vector as val}
                          <div class="flex flex-col items-center gap-1">
                            <div
                              class="w-4 bg-blue-500/20 rounded-full h-8 relative overflow-hidden border border-blue-500/10"
                            >
                              <div
                                class="absolute bottom-0 left-0 right-0 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                style="height: {val * 100}%"
                              ></div>
                            </div>
                            <span class="text-[8px] font-mono text-neutral-600"
                              >{val.toFixed(2)}</span
                            >
                          </div>
                        {/each}
                      </div>
                    </td>
                    <td class="px-8 py-6">
                      <div class="flex flex-wrap gap-2">
                        {#each Object.entries(pt.payload) as [k, v]}
                          <div
                            class="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center gap-2"
                          >
                            <span
                              class="text-[9px] font-bold text-neutral-500 uppercase"
                              >{k}:</span
                            >
                            <span class="text-[10px] font-bold text-indigo-400"
                              >{v}</span
                            >
                          </div>
                        {/each}
                      </div>
                    </td>
                    <td class="px-8 py-6 text-right pr-12">
                      <div
                        class="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button
                          aria-label="Edit point"
                          class="p-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-all shadow-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path d="M12 20h9" /><path
                              d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                            /></svg
                          >
                        </button>
                        <button
                          aria-label="Delete point"
                          class="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all shadow-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
                          >
                        </button>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      {/if}

      {#if activeSection === "search"}
        <div class="max-w-5xl mx-auto space-y-12">
          <div class="space-y-6 text-center">
            <span
              class="text-[12px] font-black text-blue-500 uppercase tracking-[0.4em]"
              >Similarity Engine</span
            >
            <h3 class="text-4xl font-black text-white">Find Your Vectors</h3>
          </div>

          <!-- Search Bar -->
          <div
            class="p-2 bg-neutral-900/50 border border-neutral-800/50 rounded-[32px] flex items-center shadow-2xl shadow-blue-500/[0.02]"
          >
            <div
              class="flex-1 px-8 py-4 font-mono text-neutral-400 text-lg outline-none select-none italic opacity-50"
            >
              [ 0.12, 0.44, 0.98, 0.22, ... ]
            </div>
            <button
              class="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black rounded-3xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform active:scale-95"
              >QUERY ENGINE</button
            >
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each points as result, i}
              <div
                class="p-10 bg-neutral-900/20 border border-neutral-800/40 rounded-[40px] relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500"
              >
                <div class="absolute top-0 right-0 p-8">
                  <span
                    class="text-[10px] font-black text-blue-500/50 border border-blue-500/10 px-3 py-1 rounded-full bg-blue-500/5 uppercase tracking-widest"
                    >Similarity: 0.992</span
                  >
                </div>
                <div class="relative z-10 space-y-6">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 font-black text-xl border border-blue-500/20"
                    >
                      #{i + 1}
                    </div>
                    <div>
                      <h4
                        class="text-xl font-bold text-white uppercase tracking-tight"
                      >
                        {result.payload.city}
                      </h4>
                      <p class="text-xs text-neutral-500 font-mono">
                        ID: {result.id} • Score: 0.99{9 - i}
                      </p>
                    </div>
                  </div>

                  <div class="space-y-3">
                    <div
                      class="w-full h-2 bg-neutral-800/50 rounded-full overflow-hidden border border-neutral-700/20"
                    >
                      <div
                        class="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                        style="width: {98 - i * 10}%"
                      ></div>
                    </div>
                  </div>

                  <div class="pt-4 flex gap-3">
                    <button
                      class="px-5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:text-white transition-colors"
                      >Raw Payload</button
                    >
                    <button
                      class="px-5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:text-white transition-colors"
                      >Vector Data</button
                    >
                  </div>
                </div>
                <!-- Glow effect -->
                <div
                  class="absolute -left-20 -bottom-20 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors duration-500"
                ></div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      {#if activeSection === "snapshots"}
        <div
          class="h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500"
        >
          <div
            class="w-32 h-32 bg-neutral-900/50 border border-neutral-800/50 rounded-full flex items-center justify-center relative"
          >
            <svg
              class="text-neutral-700"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
              /></svg
            >
            <div
              class="absolute -top-2 -right-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black rounded-full uppercase italic"
            >
              Coming Soon
            </div>
          </div>
          <div class="text-center space-y-2">
            <h3 class="text-2xl font-bold text-white">Snapshot Manager</h3>
            <p class="text-sm text-neutral-500 max-w-xs mx-auto text-balance">
              Backup and restore your vector data with one click. We are
              polishing this interface.
            </p>
          </div>
          <button
            class="px-8 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-bold text-neutral-400 hover:text-white transition-all uppercase tracking-widest shadow-none"
            >Read Documentation</button
          >
        </div>
      {/if}

      {#if activeSection === "system"}
        <div class="space-y-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              class="p-10 bg-neutral-900/20 border border-neutral-800/40 rounded-[40px] space-y-8"
            >
              <div class="flex items-center justify-between">
                <h4 class="text-lg font-bold">Node Performance</h4>
                <span
                  class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold rounded-full uppercase tracking-tighter"
                  >Healthy</span
                >
              </div>
              <div class="space-y-6">
                {#each [["CPU Load", "14%", "w-[14%]"], ["Memory Usage", "2.1GB / 16GB", "w-[25%]"], ["Disk Space", "124GB / 500GB", "w-[30%]"]] as item}
                  <div class="space-y-3">
                    <div
                      class="flex justify-between text-xs font-bold text-neutral-500 uppercase tracking-widest"
                    >
                      <span>{item[0]}</span>
                      <span class="text-neutral-300 font-mono">{item[1]}</span>
                    </div>
                    <div
                      class="w-full h-2 bg-neutral-800 rounded-full overflow-hidden"
                    >
                      <div
                        class="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)] {item[2]}"
                      ></div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <div
              class="p-10 bg-neutral-900/20 border border-neutral-800/40 rounded-[40px] flex flex-col items-center justify-center space-y-4"
            >
              <div
                class="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]"
              >
                Prometheus
              </div>
              <div class="w-full flex-1 flex items-end gap-1.5 px-4 h-40">
                {#each Array(14) as _, i}
                  <div
                    class="flex-1 bg-blue-600/20 border-t border-blue-500/40 rounded-t-lg transition-all hover:bg-blue-500/40"
                    style="height: {20 + Math.random() * 60}%"
                  ></div>
                {/each}
              </div>
              <div class="text-xs font-bold text-neutral-500">
                REQUESTS PER SECOND (24H)
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Background Subtle Blur -->
    <div
      class="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"
    ></div>
    <div
      class="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"
    ></div>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #0a0a0b;
    overflow: hidden;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #262626;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #404040;
  }

  /* Animations */
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-in {
    animation: fade-in-up 0.5s ease-out forwards;
  }
</style>

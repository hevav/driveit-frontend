<script>
    import {slide} from "svelte/transition"
</script>

<div class="container min-h-fit h-full px-4 mx-auto flex flex-col gap-y-8">
	<slot/>
</div>

<style>
	.container-screen {
		min-height: calc(100vh - 4rem);
	}
</style>
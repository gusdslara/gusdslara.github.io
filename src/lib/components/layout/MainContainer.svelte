<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from './Navbar.svelte';

	let scrollY = 0;
	let contentScroller: HTMLElement;
	let toolbarAnimDone = false;

	onMount(() => {
		
		setTimeout(() => {
			toolbarAnimDone = true;
		}, 500);
	});
</script>

<svelte:window bind:scrollY />

<div class="main tb-height--full junkie">
	<Navbar {scrollY} scrollContainer={contentScroller} />

	
	<div class="tb-height--full">
		<div class="tb-height--full">
			<div
				bind:this={contentScroller}
				class="tb-height--full tb-overflow--auto"
				id="dashboard-container"
			>
				<slot />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.main {
		position: relative;
		overflow-x: hidden;
	}

	#dashboard-container {
		scroll-behavior: smooth;
	}
</style>

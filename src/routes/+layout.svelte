<script lang="ts">
	import '../app.scss';
</script>

<div class="app">
	<slot />
</div>

<style lang="scss">
	:global(html) {
		scroll-padding-top: 120px !important;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>

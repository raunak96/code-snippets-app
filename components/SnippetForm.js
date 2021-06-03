import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
export default function SnippetForm({ snippet }) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm({
		defaultValues: {
			name: snippet?.data?.name ?? "",
			language: snippet?.data?.language ?? "",
			description: snippet?.data?.description ?? "",
			code: snippet?.data?.code ?? "",
		},
	});
	const createSnippet = async data => {
		const { code, language, description, name } = data;
		try {
			await axios.post("/api/snippet", {
				code,
				language: language.toLowerCase(),
				description,
				name,
			});
			router.push("/");
		} catch (err) {
			console.error(err);
		}
	};

	const updateSnippet = async data => {
		const { code, language, description, name } = data;
		const id = snippet.id;
		try {
			await axios.put(`/api/snippet/${id}`, {
				code,
				language: language.toLowerCase(),
				description,
				name,
			});
			router.push("/");
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<form onSubmit={handleSubmit(snippet ? updateSnippet : createSnippet)}>
			<div className="mb-4">
				<label
					className="block text-red-100 text-sm font-bold mb-1"
					htmlFor="name">
					Name
				</label>
				<input
					type="text"
					id="name"
					{...register("name", { required: true })}
					className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
				/>
				{errors.name && (
					<p className="font-bold text-red-900">Name is required</p>
				)}
			</div>
			<div className="mb-4">
				<label
					className="block text-red-100 text-sm font-bold mb-1"
					htmlFor="language">
					Language
				</label>
				<select
					id="language"
					{...register("language", { required: true })}
					className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700">
					<option className="py-1">JavaScript</option>
					<option className="py-1">HTML</option>
					<option className="py-1">CSS</option>
				</select>
				{errors.language && (
					<p className="font-bold text-red-900">
						Language is required
					</p>
				)}
			</div>
			<div className="mb-4">
				<label
					className="block text-red-100 text-sm font-bold mb-1"
					htmlFor="description">
					Description
				</label>
				<textarea
					{...register("description", { required: true })}
					id="description"
					rows="3"
					className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
					placeholder="What does the snippet do?"></textarea>
				{errors.description && (
					<p className="font-bold text-red-900">
						Description is required
					</p>
				)}
			</div>
			<div className="mb-4">
				<label
					className="block text-red-100 text-sm font-bold mb-1"
					htmlFor="code">
					Code
				</label>
				<textarea
					{...register("code", { required: true })}
					id="code"
					rows="10"
					className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
					placeholder="ex. console.log('helloworld')"></textarea>
				{errors.code && (
					<p className="font-bold text-red-900">Code is required</p>
				)}
			</div>
			<button
				className={`bg-red-800 ${
					!(snippet && !isDirty) && "hover:bg-red-900"
				} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 disabled:opacity-50`}
				type="submit"
				disabled={snippet && !isDirty}>
				{snippet ? "Update" : "Save"}
			</button>
			<Link href="/">
				<a className="mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
					Cancel
				</a>
			</Link>
		</form>
	);
}
